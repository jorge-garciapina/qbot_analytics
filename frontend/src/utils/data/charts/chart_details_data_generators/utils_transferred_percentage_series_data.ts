import { SeriesItem } from "../../../../types/data_types";
import { FetchedDataType } from "../../../../types/data_fetching_types";

export function generateTransferredPercentageSeriesData({
  fetchedData,
  seriesName,
}: {
  fetchedData: FetchedDataType;
  seriesName: string;
}): SeriesItem[] {
  const seriesData =
    fetchedData?.handlingOverviewDaily.callsHandledByAIPercentage || [];
  return [
    {
      name: seriesName,
      type: "line",
      data: seriesData,
    },
  ];
}
