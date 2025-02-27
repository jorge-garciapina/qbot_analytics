import React, { useEffect } from "react";

import { DetailsModal } from "../../chart_factory/details_modal/comp_details_modal";

import {
  useClinicData,
  useDate,
  useDateGranularity,
  ValidGranularities,
} from "../../../hooks";

import { useHandlingOverviewDetailsDataRecords } from "../../../hooks/fetch_data_hooks/handling_overview/hook_details_data";

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
    if (granularityLogic.granularity === "yearly") {
      initialDayLogic.updateDate(initialDate);
      endDayLogic.updateDate(endDate);
    } else if (granularityLogic.granularity === "monthly") {
      initialDayLogic.updateDate("2021-10-01T06:00:00.000Z");
      endDayLogic.updateDate("2022-05-30T06:00:00.000Z");
    }
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

  const { isPending, chartOptions } = useHandlingOverviewDetailsDataRecords({
    granularity: granularityLogic.granularity,
    initialDate: initialDayLogic.date,
    endDate: endDayLogic.date,
    xAxisName,
    yAxisName,
    title,
  });

  if (isPending) return "Loading...";

  //------------ END: MULTIPLE YEAR CHART LOGIC ------------

  return (
    <DetailsModal
      options={chartOptions!}
      initialDateModifier={initialDateModifier}
      endDateModifier={endDateModifier}
      granularityModifier={granularityModifier}
      initialDate={initialDayLogic.date}
      endDate={endDayLogic.date}
    />
  );
};
