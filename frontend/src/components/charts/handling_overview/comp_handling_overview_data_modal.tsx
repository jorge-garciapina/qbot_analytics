import { DataModal } from "../../chart_factory/data_modal/comp_data_modal";
import { useClinicData } from "../../../hooks";
import { useGranularityLogic } from "./hook_use_granularity_logic";
import { useHandlingOverviewRecords } from "../../../hooks/fetch_data_hooks/handling_overview/hook_handling_overview_records";
export function HandlingOverviewDataModal() {
  const { initialDate, endDate } = useClinicData();

  // Use the custom hook for granularity logic
  const {
    granularity,
    granularityModifier,
    initialDate: adjustedInitialDate,
    endDate: adjustedEndDate,
    initialDateModifier,
    endDateModifier,
  } = useGranularityLogic(initialDate, endDate);

  const { isPending, rawData } = useHandlingOverviewRecords({
    granularity,
    initialDate: adjustedInitialDate,
    endDate: adjustedEndDate,
  });

  if (isPending) return "Loading...";
  return (
    <>
      <DataModal
        backendData={rawData}
        initialDate={adjustedInitialDate}
        endDate={adjustedEndDate}
        granularityModifier={granularityModifier}
        endDateModifier={endDateModifier}
        initialDateModifier={initialDateModifier}
      />
    </>
  );
}
