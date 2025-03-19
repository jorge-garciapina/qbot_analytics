import { useQuery } from "@tanstack/react-query";
import { fetchHandlingOverviewRecords } from "./utils_fetch_handling_overview_records";
import { ValidGranularities } from "../../../../common/types";
import { HandlingOverviewDataType } from "../types/types_handling_overview";

type UseDetailsDataInput = {
  granularity: ValidGranularities;
  initialDate: string;
  endDate: string;
};

export function useHandlingOverviewRecords({
  granularity,
  initialDate,
  endDate,
}: UseDetailsDataInput) {
  const {
    isLoading,
    error,
    data: handlingOverviewData,
    refetch,
  } = useQuery<HandlingOverviewDataType>({
    queryKey: [initialDate, endDate, granularity],
    queryFn: () =>
      fetchHandlingOverviewRecords({
        initialDate,
        endDate,
        granularity,
      }),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    isPending: isLoading,
    error,
    handlingOverviewData,
    refetch,
  };
}
