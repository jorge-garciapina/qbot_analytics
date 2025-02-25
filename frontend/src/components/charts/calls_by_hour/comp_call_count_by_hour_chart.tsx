/*
This component does not have any logic to handle the click event over a bar ot the title, 
the reason for this is that the information that can be displayed has already been addressed 
in other components. 
*/

import React, { useEffect } from "react";

import { useLoginData } from "../../../hooks/fetch_data_hooks/hook_use_login_data";
import {
  FooterSummaryTotalsType,
  DashboardChartInput,
  SeriesItem,
} from "../../../types/data_types";

import { ChartOptions } from "../../../types/data_types";

import { DashboardChart } from "../../chart_factory/chart_dashboard/comp_chart_dahboard";
import { useTranslation } from "react-i18next";

import { PeakHoursModal } from "./comp_peak_hours_modal";

import {
  generateCallCountByHourSeriesData,
  generateCallCountByHourOptions,
  generateCallCountByHourTotals,
} from "./../../../utils/data/charts";

export const CallCountByHourChart: React.FC<DashboardChartInput> = ({
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

  // Prepare chart data

  if (fetchedData) {
    // GENERATE SERIES DATA:
    const seriesData: SeriesItem[] = generateCallCountByHourSeriesData({
      fetchedData: fetchedData,
      callsHandledByAIName: t("chartInformation.peakHours.handledByAI"),
      callsHandledByHumanName: t("chartInformation.peakHours.handledByHuman"),
    });

    // GENERATE OPTIONS:
    const chartOptions: ChartOptions = generateCallCountByHourOptions({
      fetchedData: fetchedData,
      title: t("chartInformation.peakHours.chartTitle"),
      seriesData: seriesData,
      xAxisName: t("chartInformation.peakHours.xAxisName"),
      yAxisName: t("chartInformation.peakHours.yAxisName"),
    });

    // GENERATE footerSummaryInTimeInterval
    const callCountByHourTotals: FooterSummaryTotalsType =
      generateCallCountByHourTotals({
        fetchedData: fetchedData,
        peakHourName: t(
          "chartInformation.peakHours.footerSummaryInTimeInterval.peakHour"
        ),
        peakVolumeName: t(
          "chartInformation.peakHours.footerSummaryInTimeInterval.peakVolume"
        ),
      });

    return (
      <DashboardChart
        options={chartOptions}
        footerSummaryInTimeInterval={callCountByHourTotals}
        openModal={() => {
          renderModal(<PeakHoursModal />);
        }}
      />
    );
  }
};

// Memoize the component to prevent re-rendering on `initialDate` changes
export default React.memo(CallCountByHourChart, (prevProps, nextProps) => {
  return (
    prevProps.endDate === nextProps.endDate &&
    prevProps.initialDate === nextProps.initialDate
  );
});
