import { DataModal } from "../../chart_factory/data_modal/comp_data_modal";
import { useClinicData, useGranularity } from "../../../hooks";
import { useHandlingOverviewRecords } from "./backend_communication/hook_handling_overview_records";
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
  } = useGranularity(initialDate, endDate);

  const { isPending, handlingOverviewData } = useHandlingOverviewRecords({
    granularity,
    initialDate: adjustedInitialDate,
    endDate: adjustedEndDate,
  });

  if (isPending) return "Loading...";
  return (
    <>
      <DataModal
        backendData={handlingOverviewData}
        initialDate={adjustedInitialDate}
        endDate={adjustedEndDate}
        granularityModifier={granularityModifier}
        endDateModifier={endDateModifier}
        initialDateModifier={initialDateModifier}
      />
    </>
  );
}
