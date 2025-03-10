import React, { useEffect, useState } from "react";
import { useLoginData } from "../../../hooks/fetch_data_hooks/hook_use_login_data";
import { useTranslation } from "react-i18next";
import {
  generateHandlingOverviewSeriesData,
  generateHandlingOverviewOptions,
  generateHandlingOverviewTotals,
} from "../../../utils/data/charts";

import { ChartModalContainer } from "../../modals/comp_modal_container";
import { HandlingOverviewDetailsModal } from "./comp_handling_overview_details_modal";
import { HandlingOverviewDataModal } from "./comp_handling_overview_data_modal";
import { DashboardChart } from "../../chart_factory/chart_dashboard/comp_chart_dahboard";
import { DashboardChartInput } from "../../../types/data_types";

export type ModalNames = "details_modal" | "data_modal";
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

  const { isPending, error, fetchedData, refetch } = useLoginData({
    queryKey: "login",
    initialDate,
    endDate,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalId, setModalId] = useState<"details" | "data" | null>(null);

  useEffect(() => {
    refetch();
  }, [refreshTrigger]);

  // Open/Close Modal Functions
  function openDetailsModal() {
    setIsModalOpen(true);
    setModalId("details");
  }

  function openDataModal() {
    setIsModalOpen(true);
    setModalId("data");
  }

  function closeModal() {
    setIsModalOpen(false);
    setModalId(null);
  }

  // Handle loading and errors
  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  // ------------------------GENERATE CHART CONFIGURATION-----------------------
  if (fetchedData) {
    const seriesData = generateHandlingOverviewSeriesData({
      fetchedData,
      callsHandledByAIName: t(
        "chartInformation.handlingOverviewChart.handledByAI"
      ),
      callsHandledByHumanName: t(
        "chartInformation.handlingOverviewChart.handledByHuman"
      ),
    });

    const chartOptions = generateHandlingOverviewOptions({
      fetchedData,
      title,
      xAxisName,
      seriesData,
      yAxisName,
    });

    const handlingOverviewTotals = generateHandlingOverviewTotals({
      fetchedData,
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
          options={chartOptions}
          footerSummaryInTimeInterval={handlingOverviewTotals}
          openModal={(selectedModal: ModalNames) => {
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
