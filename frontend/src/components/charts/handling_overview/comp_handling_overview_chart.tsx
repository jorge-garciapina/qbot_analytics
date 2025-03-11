import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { generateHandlingOverviewTotals } from "./utils_handling_overview_totals";
import { ChartModalContainer } from "../../modals/comp_modal_container";
import { HandlingOverviewDetailsModal } from "./comp_handling_overview_details_modal";
import { HandlingOverviewDataModal } from "./comp_handling_overview_data_modal";
import { DashboardChart } from "../../chart_factory/chart_dashboard/comp_chart_dahboard";
import { DashboardChartInput } from "../../../types/data_types";
import { ModalNames } from "../../modals/comp_modal_container";
import { useHandlingOverviewRecords } from "./backend_communication/hook_handling_overview_records";

import { handlingOverviewDetailsOptions } from "./handling_overview_details_options";
// Main Component
const HandlingOverviewChart: React.FC<DashboardChartInput> = ({
  initialDate,
  endDate,
  refreshTrigger,
}) => {
  const { t } = useTranslation();
  const title = t("chartInformation.handlingOverviewChart.chartTitle");
  const xAxisName = t("chartInformation.handlingOverviewChart.xAxisName");
  const yAxisName = t("chartInformation.handlingOverviewChart.yAxisName");

  const { isPending, handlingOverviewData, refetch } =
    useHandlingOverviewRecords({
      granularity: "daily",
      initialDate: initialDate,
      endDate: endDate,
    });

  const options = handlingOverviewDetailsOptions({
    fetchedData: handlingOverviewData || undefined,
    xAxisName,
    yAxisName,
    title,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalId, setModalId] = useState<ModalNames | null>(null);

  useEffect(() => {
    refetch();
  }, [refreshTrigger]);

  // Open/Close Modal Functions
  function openDetailsModal() {
    setIsModalOpen(true);
    setModalId("details_modal");
  }

  function openDataModal() {
    setIsModalOpen(true);
    setModalId("data_modal");
  }

  function closeModal() {
    setIsModalOpen(false);
    setModalId(null);
  }

  // Handle loading and errors
  if (isPending) return "Loading...";

  // ------------------------GENERATE CHART CONFIGURATION-----------------------
  if (handlingOverviewData) {
    const handlingOverviewTotals = generateHandlingOverviewTotals({
      handlingOverviewData: handlingOverviewData,
      totalName: t(
        "chartInformation.handlingOverviewChart.footerSummaryInTimeInterval.total"
      ),
      handledByAIName: t(
        "chartInformation.handlingOverviewChart.footerSummaryInTimeInterval.handledByAI"
      ),
      handledByHumanName: t(
        "chartInformation.handlingOverviewChart.footerSummaryInTimeInterval.handledByHuman"
      ),
    });

    return (
      <>
        {/* Modal Container with External Control */}
        <ChartModalContainer
          detailsModal={
            <HandlingOverviewDetailsModal
              title={title}
              xAxisName={xAxisName}
              yAxisName={yAxisName}
            />
          }
          dataModal={<HandlingOverviewDataModal />}
          isOpen={isModalOpen}
          modalId={modalId}
          onClose={closeModal}
        />

        {/* Main Chart */}
        <DashboardChart
          options={options}
          footerSummaryInTimeInterval={handlingOverviewTotals}
          openModal={(selectedModal: ModalNames) => {
            // The logic to control which modal will open is created inside the <DashboardChart/> component,
            // this place is the entry point to that logic.
            if (selectedModal === "details_modal") {
              openDetailsModal();
            } else if (selectedModal === "data_modal") {
              openDataModal();
            }
          }}
        />
      </>
    );
  }
};

// Memoize the component to prevent re-rendering on `initialDate` changes
export default React.memo(HandlingOverviewChart, (prevProps, nextProps) => {
  return (
    prevProps.endDate === nextProps.endDate &&
    prevProps.initialDate === nextProps.initialDate
  );
});
