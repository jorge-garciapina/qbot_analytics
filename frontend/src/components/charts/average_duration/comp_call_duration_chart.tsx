import React, { useEffect } from "react";

import { DurationModal } from "./comp_duration_modal";

import { useLoginData } from "../../../hooks/fetch_data_hooks/hook_use_login_data";
import { DashboardChartInput, SeriesItem } from "../../../types/data_types";

import { ChartOptions } from "../../../types/data_types";
import { DashboardChart } from "../../chart_factory/chart_dashboard/comp_chart_dahboard";
import { useTranslation } from "react-i18next";

import {
  generateCallDurationSeriesData,
  generateCallDurationOptions,
  generateCallDurationTotals,
} from "./../../../utils/data/charts";
const AverageTimeToEscalateChart: React.FC<DashboardChartInput> = ({
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

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  // ------------------------------------------------------

  if (fetchedData) {
    // GENERATE SERIES DATA:
    const seriesData: SeriesItem[] = generateCallDurationSeriesData({
      fetchedData: fetchedData,
      callsHandledByAIName: t("chartInformation.callDuration.handledByAI"),
      callsHandledByHumanName: t(
        "chartInformation.callDuration.handledByHuman"
      ),
    });
    // GENERATE OPTIONS:
    const chartOptions: ChartOptions = generateCallDurationOptions({
      fetchedData: fetchedData,
      title: t("chartInformation.callDuration.chartTitle"),
      seriesData: seriesData,
      xAxisName: t("chartInformation.callDuration.xAxisName"),
      yAxisName: t("chartInformation.callDuration.yAxisName"),
    });
    // GENERATE footerSummaryInTimeInterval:
    const callOutcomesTotals = generateCallDurationTotals({
      fetchedData: fetchedData,
      totalName: t(
        "chartInformation.callDuration.footerSummaryInTimeInterval.total"
      ),
      handledByAIName: t(
        "chartInformation.callDuration.footerSummaryInTimeInterval.handledByAI"
      ),
      handledByHumanName: t(
        "chartInformation.callDuration.footerSummaryInTimeInterval.handledByHuman"
      ),
    });

    return (
      <DashboardChart
        options={chartOptions}
        footerSummaryInTimeInterval={callOutcomesTotals}
        openModal={() => {
          renderModal(<DurationModal />);
        }}
      />
    );
  }
};

// Memoize the component to prevent re-rendering on `initialDate` changes
export default React.memo(
  AverageTimeToEscalateChart,
  (prevProps, nextProps) => {
    return (
      prevProps.endDate === nextProps.endDate &&
      prevProps.initialDate === nextProps.initialDate
    );
  }
);
