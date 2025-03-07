import React, { useEffect } from "react";

// import { HandlingOverviewDetailsModal } from "./comp_handling_overview_modal";
import { DashboardChart } from "../../chart_factory/chart_dashboard/comp_chart_dahboard";

import { useLoginData } from "../../../hooks/fetch_data_hooks/hook_use_login_data";

import {
  DashboardChartInput,
  ChartOptions,
  FooterSummaryTotalsType,
  SeriesItem,
} from "../../../types/data_types";

import { useTranslation } from "react-i18next";

import {
  generateHandlingOverviewSeriesData,
  generateHandlingOverviewOptions,
  generateHandlingOverviewTotals,
} from "../../../utils/data/charts";

import { useChartsInModal } from "./module_charts_in_modal";

import { ModalNames } from "./module_charts_in_modal";
// Main Component
const HandlingOverviewChart: React.FC<DashboardChartInput> = ({
  initialDate,
  endDate,
  refreshTrigger,
  renderModal,
}) => {
  const { t } = useTranslation();
  const title = t("chartInformation.handlingOverviewChart.chartTitle");
  const xAxisName = t("chartInformation.handlingOverviewChart.xAxisName");
  const yAxisName = t("chartInformation.handlingOverviewChart.yAxisName");

  const chartsInModal = useChartsInModal({
    title,
    xAxisName,
    yAxisName,
    modalRenderingFunction: renderModal,
  });

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
    const seriesData: SeriesItem[] = generateHandlingOverviewSeriesData({
      fetchedData: fetchedData,
      callsHandledByAIName: t(
        "chartInformation.handlingOverviewChart.handledByAI"
      ),
      callsHandledByHumanName: t(
        "chartInformation.handlingOverviewChart.handledByHuman"
      ),
    });

    // GENERATE OPTIONS:
    const chartOptions: ChartOptions = generateHandlingOverviewOptions({
      fetchedData: fetchedData,
      title: title,
      xAxisName: xAxisName,
      seriesData: seriesData,
      yAxisName: yAxisName,
    });

    // GENERATE footerSummaryInTimeInterval
    const handlingOverviewTotals: FooterSummaryTotalsType =
      generateHandlingOverviewTotals({
        fetchedData: fetchedData,
        totalName: t(
          "chartInformation.handlingOverviewChart.footerSummaryInTimeInterval.total"
        ),
        handledByAIName: t(
          "chartInformation.handlingOverviewChart.footerSummaryInTimeInterval.handledByAI"
        ),
        handledByHumanName: t(
          "chartInformation.handlingOverviewChart.footerSummaryInTimeInterval.handledByHuman"
        ),
      });

    return (
      <DashboardChart
        options={chartOptions}
        footerSummaryInTimeInterval={handlingOverviewTotals}
        openModal={(selectedModal: ModalNames) => {
          // By using this structure we are making the DashboarChart a "blackbox", in the sense that
          // in order to use one of their functionalities, we only need to put some function that will be
          // executed when the modal is open.
          // IN THIS PART WE CAN MONITOR CHANGES IN THE MODAL RENDERING PROCESS
          chartsInModal.renderModal({ modalToRender: selectedModal });
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
