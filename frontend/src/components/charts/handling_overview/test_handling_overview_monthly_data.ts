import { useHandlingOverviewMonthlyRecords } from "../../../hooks";
import {
  generateHandlingOverviewMonthlyDetailsData,
  generateHandlingOverviewModalOptions,
} from "../../../utils/data/charts";

interface HookInput {
  initialDate: string;
  endDate: string;
  xAxisName: string;
  yAxisName: string;
  title: string;
}
export function useHandlingOverviewMonthlyHook({
  initialDate,
  endDate,
  xAxisName,
  yAxisName,
  title,
}: HookInput) {
  const { isPending, fetchedData } = useHandlingOverviewMonthlyRecords({
    queryKey: "monthly_data_in_date_range",
    initialDate,
    endDate,
  });

  const seriesData = fetchedData
    ? generateHandlingOverviewMonthlyDetailsData(fetchedData)
    : [];

  const chartOptions = generateHandlingOverviewModalOptions({
    title: title,
    xAxisName: xAxisName,
    yAxisData: seriesData,
    yAxisName: yAxisName,
  });

  return { isPending, chartOptions };
}
