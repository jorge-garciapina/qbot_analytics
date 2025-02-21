import React from "react";

import { generateTrendSeriesData } from "../../../utils/data/charts/chart_series_generators/utils_trend_series_data";
import { useTranslation } from "react-i18next";

import { generateTrendsOptions } from "../../../utils/data/charts/chart_options_generators/utils_trend_options";

import { ModalChart } from "../../chart_factory/chart_modal/comp_chart_modal";

import { useClinicData } from "../../../hooks/use_clinic_data";

import { DateRangeSelector } from "../../date_range_selector/comp_range_selector";
import { useDate } from "../../../hooks/date_hooks/hook_use_date";

import { useMultipleYearCallRecords } from "../../../hooks/fetch_data_hooks/hook_use_multiple_year_records";

import { evaluateYear } from "../../../utils/dates/utils_extract_year";

export const OutcomesModal: React.FC = () => {
  const { t } = useTranslation();

  const { initialDate, endDate } = useClinicData();

  const initialDayLogic = useDate(initialDate);
  const endDayLogic = useDate(endDate);

  const initialYear = evaluateYear(initialDayLogic.date);
  const endYear = evaluateYear(endDayLogic.date);

  const { isPending, fetchedData } = useMultipleYearCallRecords({
    queryKey: "get_multiple_year_data",
    initialYear,
    endYear,
  });

  if (isPending) return "Loading...";

  const seriesData = generateTrendSeriesData(fetchedData!);

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
