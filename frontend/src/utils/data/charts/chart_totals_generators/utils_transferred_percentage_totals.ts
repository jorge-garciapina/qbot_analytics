import { FooterSummaryTotalsType } from "../../../../types/data_types";
import { FetchedDataType } from "../../../../types/data_fetching_types";

interface HandlingOverviewFooterTotalsInput {
  fetchedData: FetchedDataType | undefined;
  totalName: string;
  handledByAIName: string;
  handledByHumanName: string;
}
export function generateHumanHandledCallsPercentageTotals({
  fetchedData,
  totalName,
  handledByAIName,
  handledByHumanName,
}: HandlingOverviewFooterTotalsInput): FooterSummaryTotalsType {
  const totalCalls = fetchedData?.handlingOverviewTotal.total || 0;

  const callsHandledByAIPercentage =
    fetchedData?.handlingOverviewTotal.handledByAIPercentage || 0;

  const callsHandledByHumanPercentage =
    fetchedData?.handlingOverviewTotal.handledByHumanPercentage || 0;

  const handlingOverviewTotals: FooterSummaryTotalsType = [
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
  return handlingOverviewTotals;
}
