import { Modal, styled } from "@mui/material";

export const StyledModalContainer = styled(Modal)(() => ({
  backgroundColor: "pink",
  flexDirection: "column",
  borderColor: "rgb(255,0,0)",
  borderWidth: "5px",
  border: "solid",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  overflow: "auto",
  zIndex: 1000,
}));
