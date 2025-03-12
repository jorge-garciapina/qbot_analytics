// CUSTOM COMPONENTS IMPORTS
import { ActionToolbarDashboardChartContainer } from "./styled_action_toolbar_dashboard_chart";
import { DropDownMenuChart } from "../drop_down_menu_chart/comp_drop_down_menu_chart";
import { IconButtonChart } from "../icon_button/comp_icon_button";

// TRANSLATION IMPORTS
import { useTranslation } from "react-i18next";

// TYPES IMPORTS
import { ModalNames } from "../../../modals/comp_modal_container";
interface ActionToolbarInput {
  openModal: (selectedModal: ModalNames) => void;
}

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
