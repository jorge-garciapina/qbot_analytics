import { ActionToolbar, TitleContainer } from "../../partials/";
import { ModalNames } from "../../../modals/comp_modal_container";
import { Box, styled } from "@mui/material";

interface UpperSectionInput {
  title: string;
  openModal: (selectedModal: ModalNames) => void;
}

export const UpperSectionDashboardChart: React.FC<UpperSectionInput> = ({
  title,
  openModal,
}) => {
  return (
    <UpperSection>
      <TitleContainer title={title} />
      <ActionToolbar openModal={openModal} />
    </UpperSection>
  );
};

// STYLED COMPONENT
const UpperSection = styled(Box)(() => ({
  display: "flex", // Use flexbox for layout
  justifyContent: "flex-start", // Space out the children
  backgroundColor: "rgb(255,255,255)",
  paddingTop: "5px",
}));
