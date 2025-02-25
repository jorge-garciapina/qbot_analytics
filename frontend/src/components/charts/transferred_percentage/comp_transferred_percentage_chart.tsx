import React, { useEffect } from "react";

import { TransferredPercentageModal } from "./comp_transferred_percentage_modal";

import {
  FooterSummaryTotalsType,
  DashboardChartInput,
  SeriesItem,
} from "../../../types/data_types";

import { useLoginData } from "../../../hooks/fetch_data_hooks/hook_use_login_data";

import { ChartOptions } from "../../../types/data_types";
import { DashboardChart } from "../../chart_factory/chart_dashboard/comp_chart_dahboard";
import { useTranslation } from "react-i18next";

import {
  generateTransferredPercentageSeriesData,
  generateTransferredCallsOptions,
  generateTransferredPercentageTotals,
} from "./../../../utils/data/charts";

const EscalationRateChart: React.FC<DashboardChartInput> = ({
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
    const seriesData: SeriesItem[] = generateTransferredPercentageSeriesData({
      fetchedData: fetchedData,
      seriesName: t("chartInformation.transferredPercentage.seriesName"),
    });

    // GENERATE OPTIONS:
    const chartOptions: ChartOptions = generateTransferredCallsOptions({
      fetchedData: fetchedData,
      title: t("chartInformation.transferredPercentage.chartTitle"),
      seriesData: seriesData,
      xAxisName: t("chartInformation.transferredPercentage.xAxisName"),
      yAxisName: t("chartInformation.transferredPercentage.yAxisName"),
    });

    // GENERATE footerSummaryInTimeInterval
    const callOutcomesTotals: FooterSummaryTotalsType =
      generateTransferredPercentageTotals({
        fetchedData: fetchedData,
        totalName: t(
          "chartInformation.transferredPercentage.footerSummaryInTimeInterval.total"
        ),
        handledByAIName: t(
          "chartInformation.transferredPercentage.footerSummaryInTimeInterval.handledByAI"
        ),
        handledByHumanName: t(
          "chartInformation.transferredPercentage.footerSummaryInTimeInterval.handledByHuman"
        ),
      });

    return (
      <DashboardChart
        options={chartOptions}
        footerSummaryInTimeInterval={callOutcomesTotals}
        openModal={() => {
          renderModal(<TransferredPercentageModal />);
        }}
      />
    );
  }
};

// Memoize the component to prevent re-rendering on `initialDate` changes
export default React.memo(EscalationRateChart, (prevProps, nextProps) => {
  return (
    prevProps.endDate === nextProps.endDate &&
    prevProps.initialDate === nextProps.initialDate
  );
});
