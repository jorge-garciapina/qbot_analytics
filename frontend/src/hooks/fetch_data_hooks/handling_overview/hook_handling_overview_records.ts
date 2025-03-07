import { useQuery } from "@tanstack/react-query";
import { fetchDetailsRecordsRaw } from "../../../components/charts/handling_overview/utils_fetch_details_records_raw";
import { ValidGranularities } from "../../date_hooks/hook_use_date_granularity";
import { HandlingOverviewDataType } from "../../../types";

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
    data: rawData,
    refetch,
  } = useQuery<HandlingOverviewDataType>({
    queryKey: [initialDate, endDate, granularity],
    queryFn: () =>
      fetchDetailsRecordsRaw({
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
    rawData,
    refetch,
  };
}
