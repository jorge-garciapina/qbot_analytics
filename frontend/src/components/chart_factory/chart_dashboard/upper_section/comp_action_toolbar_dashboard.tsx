// CUSTOM COMPONENTS IMPORTS
import { ActionToolbarDashboardChartContainer } from "../../../../mui_configurations/styled_components/chart_sections/upper_section/styled_action_tool_bar_dashboard_chart";
import { DropDownMenuChart } from "../../../library/comp_drop_down_menu_chart";
import { IconButtonChart } from "./comp_icon_button";

// TRANSLATION IMPORTS
import { useTranslation } from "react-i18next";

// TYPES IMPORTS
// import { ActionToolbarInput } from "../../../../types/data_types";
import { ModalNames } from "../../../modals/comp_modal_container";
export interface ActionToolbarInput {
  openModal: (selectedModal: ModalNames) => void;
}

// LIBRARY IMPORTS
import { OpenInNew, Search } from "@mui/icons-material";

//TODO: IN ORDER TO IMPLEMENT THE NEW MODULE FOR THE "MODAL BUTTONS" IT IS NECESSARY
//      TO REPLACE THE DOUBLE CALL OF IconButtonChart FOR AN INSTANCE OF THE "MODAL BUTTONS"
//      COMPONENT.
//      THE IDEA IS THAT ALL THE CHARTS IN THE DASHBOARD CAN USE THE LOGIC TO CALL THE MODAL
//      FILLING IT WITH THE INFORMATION REQUIRED BY EACH PARTICULAR CASE.
//      THE GOAL OF THIS IS TO HAVE A COMPLETELY MODULARIZED FRONTEND- THIS WILL SIMPLIFY THE
//      ADDITION OF NEW FEATURES IN THE FUTURE.
//
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
