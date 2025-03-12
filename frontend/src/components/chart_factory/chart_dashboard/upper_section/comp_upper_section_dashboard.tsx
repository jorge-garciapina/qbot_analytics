import { DashboardChartUpperSectionContainer } from "./styled_dashboard_chart_upper_container";
import { TitleContainer } from "../../partials/chart_title_container/comp_title_container";

import { ActionToolbar } from "../../partials/action_toolbar/comp_action_toolbar_dashboard";

import { ModalNames } from "../../../modals/comp_modal_container";

export interface UpperSectionInput {
  title: string;
  openModal: (selectedModal: ModalNames) => void;
}

export const UpperSectionDashboardChart: React.FC<UpperSectionInput> = ({
  title,
  openModal,
}) => {
  return (
    <DashboardChartUpperSectionContainer>
      <TitleContainer title={title} />
      <ActionToolbar openModal={openModal} />
    </DashboardChartUpperSectionContainer>
  );
};
