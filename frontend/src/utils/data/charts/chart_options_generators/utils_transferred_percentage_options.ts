import { SeriesItem, ChartOptions } from "../../../../types/data_types";

import { FetchedDataType } from "../../../../types/data_fetching_types";

import {
  generateYAxis,
  generateChartTitle,
  generateToolTip,
  generateLegend,
  generateXAxis,
} from "../../../utils_charts_options_object";

interface TransferredCallsInput {
  fetchedData: FetchedDataType;
  seriesData: SeriesItem[];
  title: string;
  xAxisName: string;
  yAxisName: string;
}

export function generateTransferredCallsOptions({
  fetchedData,
  seriesData,
  title,
  xAxisName,
  yAxisName,
}: TransferredCallsInput) {
  const dayKeys = fetchedData.handlingOverviewDaily.chartKeys;

  const chartOptions: ChartOptions = {
    title: generateChartTitle(title),
    tooltip: generateToolTip(),
    legend: generateLegend(),
    xAxis: generateXAxis({
      data: dayKeys,
      name: xAxisName,
    }),
    yAxis: generateYAxis(yAxisName),
    series: seriesData,
  };
  return chartOptions;
}
