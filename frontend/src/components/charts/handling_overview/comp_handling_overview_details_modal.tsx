import React from "react";
import { DetailsModal } from "../../chart_factory/details_modal/comp_details_modal";
import { useClinicData, useGranularity } from "../../../hooks";
import { useHandlingOverviewRecords } from "./backend_communication/hook_handling_overview_records";

import { generateHandlingOverviewTotals } from "./utils/utils_handling_overview_totals";

interface ChartTotal {
  name: string;
  value: number;
}
interface HandlingOverviewDetailsInput {
  title: string;
  yAxisName: string;
  footerSummaryInTimeInterval: ChartTotal[];
  totalName: string;
  handledByAIName: string;
  handledByHumanName: string;
}

export const HandlingOverviewDetailsModal: React.FC<
  HandlingOverviewDetailsInput
> = ({ title, yAxisName, totalName, handledByAIName, handledByHumanName }) => {
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
  const { isPending, handlingOverviewData } = useHandlingOverviewRecords({
    granularity,
    initialDate: adjustedInitialDate,
    endDate: adjustedEndDate,
  });

  if (isPending) return "Loading...";

  if (handlingOverviewData) {
    const handlingOverviewTotals = generateHandlingOverviewTotals({
      handlingOverviewData: handlingOverviewData,
      totalName: totalName,
      handledByAIName: handledByAIName,
      handledByHumanName: handledByHumanName,
    });

    return (
      <DetailsModal
        backendData={handlingOverviewData}
        title={title}
        yAxisName={yAxisName}
        initialDate={adjustedInitialDate}
        endDate={adjustedEndDate}
        footerSummaryInTimeInterval={handlingOverviewTotals}
        granularityModifier={granularityModifier}
        endDateModifier={endDateModifier}
        initialDateModifier={initialDateModifier}
      />
    );
  }
};
