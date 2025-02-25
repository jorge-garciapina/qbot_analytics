import { ModalChartUpperSectionContainer } from "../../../../mui_configurations/styled_components/chart_sections/upper_section/styled_modal_chart_upper_container";
import { ActionToolbar } from "./comp_action_toolbar_modal";
import { ModalHeader } from "./comp_header";

interface UpperSectionInput {
  title: string;
  initialDateModifier: (date: string) => void;
  endDateModifier: (date: string) => void;
  initialDate: string;
  endDate: string;
}

export const UpperSectionModal: React.FC<UpperSectionInput> = ({
  title,
  initialDateModifier,
  endDateModifier,
  initialDate,
  endDate,
}) => {
  return (
    <ModalChartUpperSectionContainer>
      <ModalHeader title={title} />
      <ActionToolbar
        initialDateModifier={initialDateModifier}
        endDateModifier={endDateModifier}
        initialDate={initialDate}
        endDate={endDate}
      />
    </ModalChartUpperSectionContainer>
  );
};
