import { useState, ReactNode, useEffect } from "react";
import { HandlingOverviewDetailsModal } from "./comp_handling_overview_details_modal";
import { HandlingOverviewDataModal } from "./comp_handling_overview_data_modal";

interface InputType {
  title: string;
  xAxisName: string;
  yAxisName: string;
  renderModal: (chartModal: ReactNode) => void;
}

interface OutputType {
  currentElement: ReactNode;
  setElement: (selectedModal: ModalNames) => void;
}

export type ModalNames = "details_modal" | "data_modal";

export function useChartsInModal({
  title,
  xAxisName,
  yAxisName,
  renderModal,
}: InputType): OutputType {
  // State for the currently displayed modal component
  const [currentElement, setCurrentElement] = useState<ReactNode>(
    <HandlingOverviewDetailsModal
      title={title}
      xAxisName={xAxisName}
      yAxisName={yAxisName}
    />
  );

  // Flag to determine if renderModal should be triggered
  const [shouldTriggerRenderModal, setShouldTriggerRenderModal] =
    useState(false);

  useEffect(() => {
    if (!shouldTriggerRenderModal) return; // Prevent execution on mount

    renderModal(currentElement);
    setShouldTriggerRenderModal(false); // Reset flag after execution
  }, [currentElement]); // Runs when currentElement changes

  function setElement(selectedModal: ModalNames) {
    let newElement: ReactNode;

    if (selectedModal === "details_modal") {
      newElement = (
        <HandlingOverviewDetailsModal
          title={title}
          xAxisName={xAxisName}
          yAxisName={yAxisName}
        />
      );
    } else if (selectedModal === "data_modal") {
      newElement = <HandlingOverviewDataModal />;
    } else {
      return; // Prevent unnecessary updates
    }

    setCurrentElement(newElement);
    setShouldTriggerRenderModal(true); // Set flag to trigger renderModal
  }

  return { currentElement, setElement };
}
