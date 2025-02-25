import { DashboardChartUpperSectionContainer } from "../../../../mui_configurations/styled_components/chart_sections/upper_section/styled_dashboard_chart_upper_container";
import { TitleContainer } from "./comp_title_container";

import { ActionToolbar } from "./comp_action_toolbar_dashboard";
import { UpperSectionInput } from "../../../../types/data_types";

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
