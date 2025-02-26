import { FooterSummaryTotalsType } from "../../../../types/data_types";
import { FetchedDataType } from "../../../../types/data_fetching_types";

interface HandlingOverviewTotalsInput {
  fetchedData: FetchedDataType | undefined;
  totalName: string;
  handledByAIName: string;
  handledByHumanName: string;
}
export function generateHandlingOverviewTotals({
  fetchedData,
  totalName,
  handledByAIName,
  handledByHumanName,
}: HandlingOverviewTotalsInput): FooterSummaryTotalsType {
  const footerSummaryInTimeInterval = fetchedData?.handlingOverviewTotal;

  const handlingOverviewTotals: FooterSummaryTotalsType = [
    {
      name: totalName,
      value: footerSummaryInTimeInterval?.total || 0,
    },
    {
      name: handledByAIName,
      value: footerSummaryInTimeInterval?.handledByAI || 0,
    },
    {
      name: handledByHumanName,
      value: footerSummaryInTimeInterval?.handledByHuman || 0,
    },
  ];
  return handlingOverviewTotals;
}
