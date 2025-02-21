import { useQuery } from "@tanstack/react-query";

import { fetchMultipleYearData } from "../../utils/custom_queries/utils_fetch_multiple_year_data";

type UseMultipleYearCallRecordsInput = {
  queryKey: "get_multiple_year_data";
  initialYear: number;
  endYear: number;
};
export function useMultipleYearCallRecords({
  queryKey,
  initialYear,
  endYear,
}: UseMultipleYearCallRecordsInput) {
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
    // initialData: [],
  });

  return {
    isPending,
    error,
    fetchedData,
    refetch,
  };
}
