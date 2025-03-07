import { useState, ReactNode, useEffect } from "react";
import { HandlingOverviewDetailsModal } from "./comp_handling_overview_details_modal";
import { HandlingOverviewDataModal } from "./comp_handling_overview_data_modal";

interface InputType {
  title: string;
  xAxisName: string;
  yAxisName: string;
  modalRenderingFunction: (chartModal: ReactNode) => void;
}

export type ModalNames = "details_modal" | "data_modal";

interface OutputType {
  currentElement: ReactNode;
  renderModal: ({ modalToRender }: { modalToRender: ModalNames }) => void;
}

export function useChartsInModal({
  title,
  xAxisName,
  yAxisName,
  modalRenderingFunction,
}: InputType): OutputType {
  // State for the currently displayed modal component
  const [currentElement, setCurrentElement] = useState<ReactNode>(
    //TODO: It is not good idea to use REact node into the state
    <HandlingOverviewDetailsModal
      title={title}
      xAxisName={xAxisName}
      yAxisName={yAxisName}
    />
  );

  // Flag to determine if modalRenderingFunction should be triggered
  const [shouldTriggerRenderModal, setShouldTriggerRenderModal] =
    useState(false);

  useEffect(() => {
    if (!shouldTriggerRenderModal) return; // Prevent execution on mount

    modalRenderingFunction(currentElement);
    setShouldTriggerRenderModal(false); // Reset flag after execution
  }, [currentElement]); // Runs when currentElement changes

  function renderModal({ modalToRender }: { modalToRender: ModalNames }) {
    let newElement: ReactNode;

    if (modalToRender === "details_modal") {
      newElement = (
        <HandlingOverviewDetailsModal
          title={title}
          xAxisName={xAxisName}
          yAxisName={yAxisName}
        />
      );
    } else if (modalToRender === "data_modal") {
      newElement = <HandlingOverviewDataModal />;
    } else {
      return; // Prevent unnecessary updates
    }

    setCurrentElement(newElement);
    setShouldTriggerRenderModal(true); // Set flag to trigger modalRenderingFunction
  }

  return { currentElement, renderModal };
}
