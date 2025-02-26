import { SeriesItem } from "../../../../../types/data_types";

import { HandlingOverviewMonthlyDataType } from "../../../../../types";

export function generateHandlingOverviewMonthlyDetailsData(
  dataToProcess: HandlingOverviewMonthlyDataType
): SeriesItem[] {
  const seriesData: SeriesItem[] = [
    {
      name: `${dataToProcess.year} Scheduled`,
      type: "bar",
      stack: `${dataToProcess.year}`,
      data: dataToProcess.scheduledCallsByMonth || [],
    },
    {
      name: `${dataToProcess.year} Transferred`,
      type: "bar",
      stack: `${dataToProcess.year}`,
      data: dataToProcess.transferredCallsByMonth || [],
    },
  ];

  return seriesData;
}
