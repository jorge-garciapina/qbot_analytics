import { SeriesItem } from "../../../../../types/data_types";

import { HandlingOverviewMonthlyDataType } from "../../../../../types";

export function generateHandlingOverviewMonthlyDetailsData(
  dataToProcess: HandlingOverviewMonthlyDataType
): SeriesItem[] {
  const seriesData: SeriesItem[] = [
    {
      name: `${dataToProcess.year} Calls Handled By Human`,
      type: "bar",
      stack: `${dataToProcess.year}`,
      data: dataToProcess.callsHandledByHuman || [],
    },
    {
      name: `${dataToProcess.year} Transferred`,
      type: "bar",
      stack: `${dataToProcess.year}`,
      data: dataToProcess.callsHandledByAI || [],
    },
  ];

  return seriesData;
}
