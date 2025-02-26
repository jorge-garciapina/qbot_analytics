import { FooterSummaryTotalsType } from "../../../../types/data_types";
import { FetchedDataType } from "../../../../types/data_fetching_types";

interface CallOutcomesInput {
  fetchedData: FetchedDataType | undefined;
  totalName: string;
  handledByAIName: string;
  handledByHumanName: string;
}
export function generateCallDurationTotals({
  fetchedData,
  totalName,
  handledByAIName,
  handledByHumanName,
}: CallOutcomesInput): FooterSummaryTotalsType {
  const totalCalls = fetchedData?.handlingOverviewTotal.total || 0;

  const callsHandledByAIPercentage =
    fetchedData?.handlingOverviewTotal.handledByAIPercentage || 0;

  const callsHandledByHumanPercentage =
    fetchedData?.handlingOverviewTotal.handledByHumanPercentage || 0;

  const callOutcomesTotals: FooterSummaryTotalsType = [
    {
      name: totalName,
      value: totalCalls,
    },
    {
      name: handledByAIName,
      value: callsHandledByAIPercentage,
    },
    {
      name: handledByHumanName,
      value: callsHandledByHumanPercentage,
    },
  ];
  return callOutcomesTotals;
}
