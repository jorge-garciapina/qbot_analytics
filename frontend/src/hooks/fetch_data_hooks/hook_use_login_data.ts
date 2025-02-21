import { useQuery } from "@tanstack/react-query";

import { fetchLoginData } from "../../utils/custom_queries/utils_fetch_login_data";

//------------------------------------------------------------

type UseCallRecordsInputMigration = {
  queryKey: "login";
  initialDate: string;
  endDate: string;
};

export function useLoginData({
  queryKey,
  initialDate,
  endDate,
}: UseCallRecordsInputMigration) {
  const {
    isPending,
    error,
    data: fetchedData,
    refetch,
  } = useQuery({
    queryKey: [queryKey, initialDate, endDate],
    queryFn: fetchLoginData,
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
