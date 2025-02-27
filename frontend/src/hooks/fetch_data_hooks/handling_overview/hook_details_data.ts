import { useQuery } from "@tanstack/react-query";

import { fetchDetailsData } from "../../../utils/custom_queries/handling_overview/utils_fetch_details_data";
import { ValidGranularities } from "../../date_hooks/hook_use_date_granularity";

type UseDetailsDataInput = {
  granularity: ValidGranularities;
  initialDate: string;
  endDate: string;
  xAxisName: string;
  yAxisName: string;
  title: string;
};
export function useHandlingOverviewDetailsDataRecords({
  initialDate,
  endDate,
  granularity,
  xAxisName,
  yAxisName,
  title,
}: UseDetailsDataInput) {
  const {
    isPending,
    error,
    data: chartOptions,
    refetch,
  } = useQuery({
    queryKey: [initialDate, endDate, granularity, xAxisName, yAxisName, title],
    queryFn: fetchDetailsData,
    staleTime: Infinity,
    refetchOnMount: false, // Do not refetch when component mounts
    refetchOnWindowFocus: false, // Do not refetch on window focus
  });

  return {
    isPending,
    error,
    chartOptions,
    refetch,
  };
}
