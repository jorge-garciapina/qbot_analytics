import { SeriesItem } from "../../../../types/data_types";

import { FetchedDataType } from "../../../../types/data_fetching_types";

interface CallDurationData {
  fetchedData: FetchedDataType;
  callsHandledByAIName: string;
  callsHandledByHumanName: string;
}

export function generateCallCountByHourSeriesData({
  fetchedData,
  callsHandledByAIName,
  callsHandledByHumanName,
}: CallDurationData): SeriesItem[] {
  const callsHandledByAI = fetchedData.peakTimes.callsHandledByAI;
  const callsHandledByHuman = fetchedData.peakTimes.callsHandledByHuman;
  return [
    {
      name: callsHandledByAIName,
      type: "bar",
      stack: "calls",
      data: callsHandledByAI,
    },
    {
      name: callsHandledByHumanName,
      type: "bar",
      stack: "calls",
      data: callsHandledByHuman,
    },
  ];
}
