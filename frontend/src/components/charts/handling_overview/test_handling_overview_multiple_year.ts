import { evaluateYear } from "../../../utils/dates/utils_extract_year";
import { useHandlingOverviewMultipleYearRecords } from "../../../hooks";
import {
  generateHandlingOverviewMultipleYearDetailsData,
  generateHandlingOverviewModalOptions,
} from "../../../utils/data/charts";

interface HookInput {
  initialDate: string;
  endDate: string;
  xAxisName: string;
  yAxisName: string;
  title: string;
}
export function useHandlingOverviewMultipleYearHook({
  initialDate,
  endDate,
  xAxisName,
  yAxisName,
  title,
}: HookInput) {
  const initialYear = evaluateYear(initialDate);
  const endYear = evaluateYear(endDate);

  const { isPending, fetchedData } = useHandlingOverviewMultipleYearRecords({
    queryKey: "multiple_year_data",
    initialYear,
    endYear,
  });

  const seriesData = fetchedData
    ? generateHandlingOverviewMultipleYearDetailsData(fetchedData)
    : [];

  const chartOptions = generateHandlingOverviewModalOptions({
    title: title,
    xAxisName: xAxisName,
    yAxisData: seriesData,
    yAxisName: yAxisName,
  });

  return { isPending, chartOptions };
}
