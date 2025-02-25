import React, { useEffect } from "react";

import { HandlingOverviewModal } from "./comp_handling_overview_modal";
import { DashboardChart } from "../../chart_factory/chart_dashboard/comp_chart_dahboard";

import { useLoginData } from "../../../hooks/fetch_data_hooks/hook_use_login_data";

import {
  DashboardChartInput,
  ChartOptions,
  ChartTotals,
  SeriesItem,
} from "../../../types/data_types";

import { useTranslation } from "react-i18next";

import {
  generateCallOutcomesSeriesData,
  generateCallOutcomesOptions,
  generateCallOutcomesTotals,
} from "../../../utils/data/charts";
// Main Component
const HandlingOverviewChart: React.FC<DashboardChartInput> = ({
  initialDate,
  endDate,
  refreshTrigger,
  renderModal,
}) => {
  const { t } = useTranslation();

  const { isPending, error, fetchedData, refetch } = useLoginData({
    queryKey: "login",
    initialDate,
    endDate,
  });

  useEffect(() => {
    refetch();
  }, [refreshTrigger]);

  // Handle loading and errors
  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  // ------------------------GENERATE CHART CONFIGURATION-----------------------
  if (fetchedData) {
    // GENERATE SERIES DATA:
    const seriesData: SeriesItem[] = generateCallOutcomesSeriesData({
      fetchedData: fetchedData,
      callsHandledByAIName: t("chartInformation.callHandlingChart.handledByAI"),
      callsHandledByHumanName: t(
        "chartInformation.callHandlingChart.handledByHuman"
      ),
    });

    const title = t("chartInformation.callHandlingChart.chartTitle");
    const xAxisName = t("chartInformation.callHandlingChart.xAxisName");
    const yAxisName = t("chartInformation.callHandlingChart.yAxisName");
    // GENERATE OPTIONS:
    const chartOptions: ChartOptions = generateCallOutcomesOptions({
      fetchedData: fetchedData,
      title: title,
      xAxisName: xAxisName,
      seriesData: seriesData,
      yAxisName: yAxisName,
    });

    // GENERATE TOTALS
    const callOutcomesTotals: ChartTotals = generateCallOutcomesTotals({
      fetchedData: fetchedData,
      totalName: t("chartInformation.callHandlingChart.totals.total"),
      handledByAIName: t(
        "chartInformation.callHandlingChart.totals.handledByAI"
      ),
      handledByHumanName: t(
        "chartInformation.callHandlingChart.totals.handledByHuman"
      ),
    });

    return (
      <DashboardChart
        options={chartOptions}
        totals={callOutcomesTotals}
        openModal={() => {
          renderModal(
            <HandlingOverviewModal
              title={title}
              xAxisName={xAxisName}
              yAxisName={yAxisName}
            />
          );
        }}
      />
    );
  }
};

// Memoize the component to prevent re-rendering on `initialDate` changes
export default React.memo(HandlingOverviewChart, (prevProps, nextProps) => {
  return (
    prevProps.endDate === nextProps.endDate &&
    prevProps.initialDate === nextProps.initialDate
  );
});
