import React from "react";

import {
  generateHandlingOverviewDetailsData,
  generateTrendsOptions,
} from "../../../utils/data/charts";

import { ModalChart } from "../../chart_factory/chart_modal/comp_chart_modal";

import {
  useClinicData,
  useHandlingOverviewMultipleYearRecords,
  useDate,
} from "../../../hooks";

import { evaluateYear } from "../../../utils/dates/utils_extract_year";

interface HandlingOverviewDetailsInput {
  title: string;
  xAxisName: string;
  yAxisName: string;
}

export const HandlingOverviewModal: React.FC<HandlingOverviewDetailsInput> = ({
  title,
  xAxisName,
  yAxisName,
}) => {
  const { initialDate, endDate } = useClinicData();

  const initialDayLogic = useDate(initialDate);
  const endDayLogic = useDate(endDate);

  const initialYear = evaluateYear(initialDayLogic.date);
  const endYear = evaluateYear(endDayLogic.date);

  const { isPending, fetchedData } = useHandlingOverviewMultipleYearRecords({
    queryKey: "get_multiple_year_data",
    initialYear,
    endYear,
  });

  if (isPending) return "Loading...";

  const seriesData = generateHandlingOverviewDetailsData(fetchedData!);

  const chartOptions = generateTrendsOptions({
    title: title,
    xAxisName: xAxisName,
    yAxisData: seriesData,
    yAxisName: yAxisName,
  });

  function initialDateModifier(date: string) {
    initialDayLogic.updateDate(date);
  }

  function endDateModifier(date: string) {
    endDayLogic.updateDate(date);
  }

  return (
    <ModalChart
      options={chartOptions}
      initialDateModifier={initialDateModifier}
      endDateModifier={endDateModifier}
      initialDate={initialDayLogic.date}
      endDate={endDayLogic.date}
    />
  );
};
