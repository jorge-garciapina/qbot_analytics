import {
  HandlingOverviewYearRecordType,
  SeriesItem,
} from "../../../../types/data_types";

export function generateHandlingOverviewDetailsData(
  dataToProcess: HandlingOverviewYearRecordType[]
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
