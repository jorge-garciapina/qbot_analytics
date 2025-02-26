import { SeriesItem, ChartOptions } from "../../../../types/data_types";

import { FetchedDataType } from "../../../../types/data_fetching_types";

import {
  generateYAxis,
  generateChartTitle,
  generateToolTip,
  generateLegend,
  generateXAxis,
} from "../../../utils_charts_options_object";

interface CallCountByHourInput {
  fetchedData: FetchedDataType;
  seriesData: SeriesItem[];
  title: string;
  xAxisName: string;
  yAxisName: string;
}

export function generateCallCountByHourOptions({
  fetchedData,
  seriesData,
  title,
  xAxisName,
  yAxisName,
}: CallCountByHourInput) {
  const hours = fetchedData?.peakTimes.hourOfTheDay || [];

  const chartOptions: ChartOptions = {
    title: generateChartTitle(title),
    tooltip: generateToolTip(),
    legend: generateLegend(),
    xAxis: generateXAxis({
      data: hours,
      name: xAxisName,
    }),
    yAxis: generateYAxis(yAxisName),
    series: seriesData,
  };
  return chartOptions;
}
