import { SeriesItem } from "../../../../types/data_types";

import { FetchedDataType } from "../../../../types/data_fetching_types";

interface CallDurationData {
  fetchedData: FetchedDataType;
  callsHandledByAIName: string;
  callsHandledByHumanName: string;
}

export function generateCallDurationSeriesData({
  fetchedData,
  callsHandledByAIName,
  callsHandledByHumanName,
}: CallDurationData): SeriesItem[] {
  const callsHandledByAIAverageDuration =
    fetchedData.averageDurationDaily.callsHandledByAIAverageDuration;
  const callsHandledByHumanAverageDuration =
    fetchedData.averageDurationDaily.callsHandledByHumanAverageDuration;
  return [
    {
      name: callsHandledByAIName,
      type: "line",
      data: callsHandledByAIAverageDuration,
    },
    {
      name: callsHandledByHumanName,
      type: "line",
      data: callsHandledByHumanAverageDuration,
    },
  ];
}
