// CUSTOM COMPONENTS IMPORTS
import { ActionToolbarDashboardChartContainer } from "../../../../mui_configurations/styled_components/chart_sections/upper_section/styled_action_tool_bar_dashboard_chart";
import { DropDownMenuChart } from "../../../library/comp_drop_down_menu_chart";
import { IconButtonChart } from "./comp_icon_button";

// TRANSLATION IMPORTS
import { useTranslation } from "react-i18next";

// TYPES IMPORTS
// import { ActionToolbarInput } from "../../../../types/data_types";
import { ModalNames } from "../../../charts/handling_overview/module_charts_in_modal";

export interface ActionToolbarInput {
  openModal: (selectedModal: ModalNames) => void;
}

// LIBRARY IMPORTS
import { OpenInNew, Search } from "@mui/icons-material";
export const ActionToolbar: React.FC<ActionToolbarInput> = ({ openModal }) => {
  const { t } = useTranslation();

  return (
    <ActionToolbarDashboardChartContainer>
      <DropDownMenuChart />
      <IconButtonChart
        icon={<OpenInNew />}
        tooltipTitle={t("chartInformation.buttons.details")}
        onClick={() => {
          openModal("details_modal");
        }}
      />

      <IconButtonChart
        icon={<Search />}
        tooltipTitle={t("chartInformation.buttons.data")}
        onClick={() => {
          openModal("data_modal");
        }}
      />
    </ActionToolbarDashboardChartContainer>
  );
};
