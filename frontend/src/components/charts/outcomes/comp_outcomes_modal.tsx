import React from "react";

import { useAppointmentTrendsData } from "../../../hooks/hook_use_appointment_trends_data";
import { generateTrendSeriesData } from "../../../utils/data/charts/chart_series_generators/utils_trend_series_data";
import { useTranslation } from "react-i18next";

import { generateTrendsOptions } from "../../../utils/data/charts/chart_options_generators/utils_trend_options";

import { ModalChart } from "../../chart_factory/chart_modal/comp_chart_modal";

import { useClinicData } from "../../../hooks/use_clinic_data";

import { DateRangeSelector } from "../../date_range_selector/comp_range_selector";
import { useDate } from "../../../hooks/date_hooks/hook_use_date";

export const OutcomesModal: React.FC = () => {
  const { t } = useTranslation();

  const { initialDate, endDate } = useClinicData();

  const initialDayLogic = useDate(initialDate);
  const endDayLogic = useDate(endDate);

  // Fetch processed appointment trends data
  const { processedData, isAnyPending } = useAppointmentTrendsData({
    initialDate: initialDayLogic.date,
    endDate: endDayLogic.date,
  });

  if (isAnyPending) return "Loading...";

  const seriesData = generateTrendSeriesData(processedData);

  const chartOptions = generateTrendsOptions({
    title: t("chartInformation.trendsChart.chartTitle"),
    xAxisName: t("chartInformation.trendsChart.xAxisName"),
    yAxisData: seriesData,
    yAxisName: t("chartInformation.trendsChart.yAxisName"),
  });

  return (
    <>
      <DateRangeSelector
        initialDateModifier={(date) => {
          initialDayLogic.updateDate(date);
        }}
        endDateModifier={(date) => {
          endDayLogic.updateDate(date);
        }}
        initialDate={initialDayLogic.date}
        endDate={endDayLogic.date}
      />
      <ModalChart options={chartOptions} />
    </>
  );
};
