import { FooterSummaryTotalsType } from "../../../../types/data_types";
import { FetchedDataType } from "../../../../types/data_fetching_types";

interface CallOutcomesInput {
  fetchedData: FetchedDataType | undefined;
  peakHourName: string;
  peakVolumeName: string;
}
export function generateCallCountByHourTotals({
  fetchedData,
  peakHourName,
  peakVolumeName,
}: CallOutcomesInput): FooterSummaryTotalsType {
  const peakHour = fetchedData?.peakTimes.peakHour || 0;
  const peakVolume = fetchedData?.peakTimes.peakVolume || 0;

  const callOutcomesTotals: FooterSummaryTotalsType = [
    {
      name: peakHourName,
      value: peakHour,
    },
    {
      name: peakVolumeName,
      value: peakVolume,
    },
  ];
  return callOutcomesTotals;
}
