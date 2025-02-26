import { useQuery } from "@tanstack/react-query";

import { fetchHandlingOverviewMonthlyData } from "../../../utils/custom_queries/handling_overview/utils_fetch_monthly_data_in_date_range";

type UseMonthlyDataInputType = {
  queryKey: "monthly_data_in_date_range";
  initialDate: string;
  endDate: string;
};
export function useHandlingOverviewMonthlyRecords({
  queryKey,
  initialDate,
  endDate,
}: UseMonthlyDataInputType) {
  const {
    isPending,
    error,
    data: fetchedData,
    refetch,
  } = useQuery({
    queryKey: [queryKey, initialDate, endDate],
    queryFn: fetchHandlingOverviewMonthlyData,
    staleTime: Infinity,
    refetchOnMount: false, // Do not refetch when component mounts
    refetchOnWindowFocus: false, // Do not refetch on window focus
  });

  return {
    isPending,
    error,
    fetchedData,
    refetch,
  };
}
