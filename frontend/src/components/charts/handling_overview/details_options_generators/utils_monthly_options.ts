import { HandlingOverviewMonthlyDataType } from "../../../../types";
import {
  generateHandlingOverviewMonthlyDetailsData,
  generateHandlingOverviewModalOptions,
} from "../../../../utils/data/charts";

import { ChartOptions } from "../../../../types/data_types";

interface InputType {
  fetchedData: HandlingOverviewMonthlyDataType | undefined;
  xAxisName: string;
  yAxisName: string;
  title: string;
}
export function handlingOverviewMonthlyOptions({
  fetchedData,
  xAxisName,
  yAxisName,
  title,
}: InputType): ChartOptions {
  const seriesData = fetchedData
    ? generateHandlingOverviewMonthlyDetailsData(fetchedData)
    : [];

  const chartOptions = generateHandlingOverviewModalOptions({
    title: title,
    xAxisName: xAxisName,
    yAxisData: seriesData,
    yAxisName: yAxisName,
  });

  return chartOptions;
}
