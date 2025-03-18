// CUSTOM COMPONENTS IMPORTS
import { DropDownMenuChart } from "../";
import { IconButtonChart } from "../";

// TRANSLATION IMPORTS
import { useTranslation } from "react-i18next";

// TYPES IMPORTS
import { ModalNames } from "../../../modals/comp_modal_container";
interface ActionToolbarInput {
  openModal: (selectedModal: ModalNames) => void;
}

import { OpenInNew, Search } from "@mui/icons-material";
import { Box, styled } from "@mui/material";

export const ActionToolbar: React.FC<ActionToolbarInput> = ({ openModal }) => {
  const { t } = useTranslation();

  return (
    <ActionToolbarStyles>
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
    </ActionToolbarStyles>
  );
};

const ActionToolbarStyles = styled(Box)(({ theme }) => ({
  display: "flex",
  flexGrow: 1,
  alignItems: "center", // Corrected camelCase for align-items
  justifyContent: "flex-end", // Corrected camelCase and added quotes for flex-end
  backgroundColor: theme.palette.test.main,
  borderWidth: "5px",
  gap: "14px",
  // border: "solid",
}));
