import React, { useEffect } from "react";

import { DetailsModal } from "../../chart_factory/details_modal/comp_details_modal";

import {
  useClinicData,
  // useHandlingOverviewMultipleYearRecords,
  useDate,
  useDateGranularity,
  ValidGranularities,
} from "../../../hooks";

// import { evaluateYear } from "../../../utils/dates/utils_extract_year";
import { useHandlingOverviewMultipleYearHook } from "./test_handling_overview_multiple_year";
import { useHandlingOverviewMonthlyHook } from "./test_handling_overview_monthly_data";

interface HandlingOverviewDetailsInput {
  title: string;
  xAxisName: string;
  yAxisName: string;
}

export const HandlingOverviewDetailsModal: React.FC<
  HandlingOverviewDetailsInput
> = ({ title, xAxisName, yAxisName }) => {
  const { initialDate, endDate } = useClinicData();

  //------------START: DATE RELATED LOGIC------------
  const initialDayLogic = useDate(initialDate);
  const endDayLogic = useDate(endDate);
  const granularityLogic = useDateGranularity();
  useEffect(() => {
    console.log("Granularity: ", granularityLogic.granularity);
  }, [granularityLogic.granularity]);

  function initialDateModifier(date: string) {
    initialDayLogic.updateDate(date);
  }
  function endDateModifier(date: string) {
    endDayLogic.updateDate(date);
  }
  function granularityModifier(newGranularity: ValidGranularities) {
    granularityLogic.updateGranularity(newGranularity);
  }
  //------------ END: DATE RELATED LOGIC ------------

  //------------START: MULTIPLE YEAR CHART LOGIC------------
  //TODO: NOW I HAVE SEPARATED THE LOGIC OF THE MULTIPLE YEAR CHART AND THE MODAL
  //      IN ORDER TO SEE IF THIS IS WORKING, I NEED TO CREATE THE LOGIC TO CALL THE
  //      DATA FOR A SINGLE YEAR AND SEE HOW THEY INTERACT WHEN CHANGING THE GRANULARITY.
  //      ONCE I HAVE BOTH WORKING I WILL NEED TO IMPLEMENT THE LOGIC FOR THE OTHER CHARTS
  const { isPending, chartOptions } = useHandlingOverviewMultipleYearHook({
    initialDate,
    endDate,
    xAxisName,
    yAxisName,
    title,
  });

  const start = "2021-10-01T06:00:00.000Z";
  const end = "2022-05-30T06:00:00.000Z";

  const { chartOptions: fetchedData } = useHandlingOverviewMonthlyHook({
    initialDate: start,
    endDate: end,
    xAxisName,
    yAxisName,
    title,
  });

  console.log("monthlyOptions: ", fetchedData);

  if (isPending) return "Loading...";

  //------------ END: MULTIPLE YEAR CHART LOGIC ------------

  return (
    <DetailsModal
      options={fetchedData}
      initialDateModifier={initialDateModifier}
      endDateModifier={endDateModifier}
      granularityModifier={granularityModifier}
      initialDate={initialDayLogic.date}
      endDate={endDayLogic.date}
    />
  );
};
