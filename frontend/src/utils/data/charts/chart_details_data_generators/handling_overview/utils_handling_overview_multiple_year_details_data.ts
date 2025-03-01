import { SeriesItem } from "../../../../../types/data_types";

import { HandlingOverviewMonthlyDataType } from "../../../../../types";

export function generateHandlingOverviewMultipleYearDetailsData(
  dataToProcess: HandlingOverviewMonthlyDataType[]
): SeriesItem[] {
  const seriesData: SeriesItem[] = dataToProcess.flatMap((current) => {
    return [
      {
        name: `${current.year} Calls Handled By Human`,
        type: "bar",
        stack: `${current.year}`,
        data: current.callsHandledByHuman || [],
      },
      {
        name: `${current.year} Transferred`,
        type: "bar",
        stack: `${current.year}`,
        data: current.callsHandledByAI || [],
      },
    ];
  });

  return seriesData;
}
