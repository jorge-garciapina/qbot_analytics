import { SeriesItem } from "../../../../../types/data_types";

import { FetchedDataType } from "../../../../../types/data_fetching_types";

interface HandlingOverviewData {
  fetchedData: FetchedDataType;
  callsHandledByAIName: string;
  callsHandledByHumanName: string;
}

export function generateHandlingOverviewSeriesData({
  fetchedData,
  callsHandledByAIName,
  callsHandledByHumanName,
}: HandlingOverviewData): SeriesItem[] {
  const callsHandledByAI: number[] =
    fetchedData.handlingOverviewDaily.callsHandledByAI;
  const callsHandledByHuman: number[] =
    fetchedData.handlingOverviewDaily.callsHandledByHuman;
  return [
    {
      data: callsHandledByAI,
      name: callsHandledByAIName,
      type: "bar",
      stack: "calls",
    },
    {
      data: callsHandledByAI,
      name: callsHandledByAIName,
      type: "line",
      stack: "",
    },
    {
      data: callsHandledByHuman,
      name: callsHandledByHumanName,
      type: "bar",
      stack: "calls",
    },
  ];
}
