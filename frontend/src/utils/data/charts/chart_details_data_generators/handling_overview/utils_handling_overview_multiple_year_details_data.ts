import { SeriesItem } from "../../../../../types/data_types";

import { HandlingOverviewMonthlyDataType } from "../../../../../types";

export function generateHandlingOverviewMultipleYearDetailsData(
  dataToProcess: HandlingOverviewMonthlyDataType[]
): SeriesItem[] {
  const seriesData: SeriesItem[] = dataToProcess.flatMap((current) => {
    return [
      {
        name: `${current.year} Scheduled`,
        type: "bar",
        stack: `${current.year}`,
        data: current.scheduledCallsByMonth || [],
      },
      {
        name: `${current.year} Transferred`,
        type: "bar",
        stack: `${current.year}`,
        data: current.transferredCallsByMonth || [],
      },
    ];
  });

  return seriesData;
}
