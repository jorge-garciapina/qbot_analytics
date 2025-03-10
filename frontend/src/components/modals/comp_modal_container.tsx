import { ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { CloseModalButton } from "../../mui_configurations/styled_components/buttons/styled_close_modal";
import { ModalContainer } from "../../mui_configurations/styled_components/chart_sections/test_modal_container";

export type ModalNames = "details_modal" | "data_modal";
interface TestingModalProps {
  detailsModal: ReactNode;
  dataModal: ReactNode;
  isOpen: boolean;
  modalId: ModalNames | null;
  onClose: () => void;
}

export const ChartModalContainer: React.FC<TestingModalProps> = ({
  detailsModal,
  dataModal,
  isOpen,
  modalId,
  onClose,
}) => {
  return (
    <ModalContainer open={isOpen} onClose={onClose}>
      <Box sx={{ p: 4 }}>
        <CloseModalButton onClick={onClose}>
          <Close />
        </CloseModalButton>

        {/* Conditionally render content */}
        {modalId === "details_modal" && (
          <>
            <Typography variant="h6">Details Modal</Typography>
            {detailsModal}
          </>
        )}
        {modalId === "data_modal" && (
          <>
            <Typography variant="h6">Data Modal</Typography>
            {dataModal}
          </>
        )}
      </Box>
    </ModalContainer>
  );
};
