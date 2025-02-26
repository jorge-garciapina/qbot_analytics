import { ChartOptions, SeriesItem } from "../../../../types/data_types";

import { FetchedDataType } from "../../../../types/data_fetching_types";

import {
  generateYAxis,
  generateChartTitle,
  generateToolTip,
  generateLegend,
  generateXAxis,
} from "../../../utils_charts_options_object";

interface HandlingOverviewOptionsInput {
  fetchedData: FetchedDataType;
  title: string;
  xAxisName: string;
  seriesData: SeriesItem[];
  yAxisName: string;
}
export function generateHandlingOverviewOptions({
  fetchedData,
  title,
  xAxisName,
  seriesData,
  yAxisName,
}: HandlingOverviewOptionsInput): ChartOptions {
  const chartKeys: string[] = fetchedData.handlingOverviewDaily.chartKeys;
  const chartOptions: ChartOptions = {
    title: generateChartTitle(title),
    tooltip: generateToolTip(),
    legend: generateLegend(),
    xAxis: generateXAxis({
      data: chartKeys,
      name: xAxisName,
    }),
    yAxis: generateYAxis(yAxisName),

    series: seriesData,
  };
  return chartOptions;
}
