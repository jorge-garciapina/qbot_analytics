import { useQuery } from "@tanstack/react-query";

import { fetchYearlyData } from "../../utils/custom_queries/utils_fetch_yearly_data";

type UseYearCallRecordsInput = {
  queryKey: "get_yearly_data";
  year: number;
};
export function useYearCallRecords({
  queryKey,
  year,
}: UseYearCallRecordsInput) {
  const inputYear = year || 0;

  const {
    isPending,
    error,
    data: fetchedData,
    refetch,
  } = useQuery({
    queryKey: [queryKey, inputYear],
    queryFn: fetchYearlyData,
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
