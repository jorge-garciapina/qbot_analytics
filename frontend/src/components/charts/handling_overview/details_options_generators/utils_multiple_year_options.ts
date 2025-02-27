import { HandlingOverviewMonthlyDataType } from "../../../../types";
import {
  generateHandlingOverviewMultipleYearDetailsData,
  generateHandlingOverviewModalOptions,
} from "../../../../utils/data/charts";

import { ChartOptions } from "../../../../types/data_types";

interface InputType {
  fetchedData: HandlingOverviewMonthlyDataType[] | undefined;
  xAxisName: string;
  yAxisName: string;
  title: string;
}
export function handlingOverviewMultipleYearOptions({
  fetchedData,
  xAxisName,
  yAxisName,
  title,
}: InputType): ChartOptions {
  const seriesData = fetchedData
    ? generateHandlingOverviewMultipleYearDetailsData(fetchedData)
    : [];

  const chartOptions = generateHandlingOverviewModalOptions({
    title: title,
    xAxisName: xAxisName,
    yAxisData: seriesData,
    yAxisName: yAxisName,
  });

  return chartOptions;
}
