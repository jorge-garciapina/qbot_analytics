import React from "react";
import { DetailsModal } from "../../chart_factory/details_modal/comp_details_modal";
import { useClinicData } from "../../../hooks";
import { useHandlingOverviewRecords, useGranularity } from "../../../hooks";

interface HandlingOverviewDetailsInput {
  title: string;
  xAxisName: string;
  yAxisName: string;
}

export const HandlingOverviewDetailsModal: React.FC<
  HandlingOverviewDetailsInput
> = ({ title, xAxisName, yAxisName }) => {
  // 1) Pull the initial and end dates from the global clinic data
  const { initialDate, endDate } = useClinicData();

  // 2) Manage granularity logic (daily, monthly, etc.)
  const {
    granularity,
    initialDate: adjustedInitialDate,
    endDate: adjustedEndDate,
    granularityModifier,
    initialDateModifier,
    endDateModifier,
  } = useGranularity(initialDate, endDate);

  // 3) Fetch the raw data from the backend
  const { isPending, rawData } = useHandlingOverviewRecords({
    granularity,
    initialDate: adjustedInitialDate,
    endDate: adjustedEndDate,
  });

  if (isPending) return "Loading...";

  return (
    <DetailsModal
      backendData={rawData}
      title={title}
      xAxisName={xAxisName}
      yAxisName={yAxisName}
      initialDate={adjustedInitialDate}
      endDate={adjustedEndDate}
      granularityModifier={granularityModifier}
      endDateModifier={endDateModifier}
      initialDateModifier={initialDateModifier}
    />
  );
};
