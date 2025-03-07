import { SeriesItem } from "../../../../../types/data_types";

import { HandlingOverviewDataType } from "../../../../../types";

export function generateHandlingOverviewMonthlyDetailsData(
  dataToProcess: HandlingOverviewDataType
): SeriesItem[] {
  const seriesData: SeriesItem[] = [
    {
      name: `${dataToProcess.year} Calls Handled By Human`,
      type: "bar",
      stack: `${dataToProcess.year}`,
      data: dataToProcess.callsHandledByHuman || [],
    },
    {
      name: `${dataToProcess.year} Calls Handled By AI`,
      type: "bar",
      stack: `${dataToProcess.year}`,
      data: dataToProcess.callsHandledByAI || [],
    },
  ];

  return seriesData;
}
