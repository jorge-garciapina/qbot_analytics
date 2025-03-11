import { FooterSummaryTotalsType } from "../../../types/data_types";
import { HandlingOverviewDataType } from "../../../types";

interface HandlingOverviewTotalsInput {
  handlingOverviewData: HandlingOverviewDataType; // New input type
  totalName: string;
  handledByAIName: string;
  handledByHumanName: string;
}

// Function to calculate the sum of an array
const sumArray = (arr: number[]): number =>
  arr.reduce((acc, val) => acc + val, 0);

/**
 * Generates handling overview totals based on fetched data and handling overview statistics.
 * It calculates the total number of calls handled by AI, handled by humans, and the overall total.
 *
 * @param handlingOverviewData - Data containing call counts handled by AI and humans.
 * @param totalName - The label for the total count of handled calls.
 * @param handledByAIName - The label for the count of AI-handled calls.
 * @param handledByHumanName - The label for the count of human-handled calls.
 * @returns An array of chart totals containing the total, AI-handled, and human-handled calls.
 */
export function generateHandlingOverviewTotals({
  handlingOverviewData,
  totalName,
  handledByAIName,
  handledByHumanName,
}: HandlingOverviewTotalsInput): FooterSummaryTotalsType {
  // Compute totals by summing the respective arrays
  const totalHandledByAI = sumArray(handlingOverviewData.callsHandledByAI);
  const totalHandledByHuman = sumArray(
    handlingOverviewData.callsHandledByHuman
  );
  const totalHandled = totalHandledByAI + totalHandledByHuman;

  // Construct the output in the expected format
  const handlingOverviewTotals: FooterSummaryTotalsType = [
    {
      name: totalName,
      value: totalHandled,
    },
    {
      name: handledByAIName,
      value: totalHandledByAI,
    },
    {
      name: handledByHumanName,
      value: totalHandledByHuman,
    },
  ];

  return handlingOverviewTotals;
}
