import React from "react";
import { DetailsModal } from "../../chart_factory/details_modal/comp_details_modal";
import { useClinicData } from "../../../hooks";
import { useHandlingOverviewRecords, useGranularity } from "../../../hooks";
import { FooterSummaryTotalsType } from "../../../types/data_types";

import { generateHandlingOverviewTotals } from "./utils/utils_handling_overview_totals";

interface HandlingOverviewDetailsInput {
  title: string;
  xAxisName: string;
  yAxisName: string;
  footerSummaryInTimeInterval: FooterSummaryTotalsType;
  totalName: string;
  handledByAIName: string;
  handledByHumanName: string;
}

export const HandlingOverviewDetailsModal: React.FC<
  HandlingOverviewDetailsInput
> = ({
  title,
  xAxisName,
  yAxisName,
  totalName,
  handledByAIName,
  handledByHumanName,
}) => {
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
      xAxisName={xAxisName}
      yAxisName={yAxisName}
      initialDate={adjustedInitialDate}
      endDate={adjustedEndDate}
      footerSummaryInTimeInterval={handlingOverviewTotals}
      granularityModifier={granularityModifier}
      endDateModifier={endDateModifier}
      initialDateModifier={initialDateModifier}
    />
  );
};
