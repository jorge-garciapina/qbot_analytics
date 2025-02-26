import { useQuery } from "@tanstack/react-query";

import { fetchMultipleYearData } from "../../../utils/custom_queries/handling_overview/utils_fetch_multiple_year_data";

type UseMultipleYearDataInput = {
  queryKey: "multiple_year_data";
  initialYear: number;
  endYear: number;
};
export function useHandlingOverviewMultipleYearRecords({
  queryKey,
  initialYear,
  endYear,
}: UseMultipleYearDataInput) {
  const iYear = initialYear || 0;
  const eYear = endYear || 0;

  const {
    isPending,
    error,
    data: fetchedData,
    refetch,
  } = useQuery({
    queryKey: [queryKey, iYear, eYear],
    queryFn: fetchMultipleYearData,
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
