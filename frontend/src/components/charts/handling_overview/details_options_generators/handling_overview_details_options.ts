import { HandlingOverviewMonthlyDataType } from "../../../../types";

import { ChartOptions } from "../../../../types/data_types";

import { SeriesItem } from "../../../../types/data_types";

import { generateChartTitle } from "../../../../utils/utils_charts_options_object";
import { generateToolTip } from "../../../../utils/utils_charts_options_object";
import { generateLegend } from "../../../../utils/utils_charts_options_object";
import { generateXAxis } from "../../../../utils/utils_charts_options_object";
import { generateYAxis } from "../../../../utils/utils_charts_options_object";

interface InputType {
  fetchedData: HandlingOverviewMonthlyDataType | undefined;
  xAxisName: string;
  yAxisName: string;
  title: string;
}
export function handlingOverviewDetailsOptions({
  fetchedData,
  xAxisName,
  yAxisName,
  title,
}: InputType): ChartOptions {
  let seriesData: SeriesItem[] = [];
  let xAxisData: string[] = [];
  if (fetchedData) {
    xAxisData = fetchedData.xAxis;
    seriesData = [
      {
        name: `${fetchedData.year} Calls Handled By Human`,
        type: "bar",
        stack: `${fetchedData.year}`,
        data: fetchedData.callsHandledByHuman || [],
      },
      {
        name: `${fetchedData.year} Calls Handled By AI`,
        type: "bar",
        stack: `${fetchedData.year}`,
        data: fetchedData.callsHandledByAI || [],
      },
    ];
  }

  const chartOptions: ChartOptions = {
    title: generateChartTitle(title),
    tooltip: generateToolTip(),
    legend: generateLegend(),
    xAxis: generateXAxis({
      data: xAxisData,
      name: xAxisName,
    }),
    yAxis: generateYAxis(yAxisName),
    series: seriesData,
  };

  return chartOptions;
}
