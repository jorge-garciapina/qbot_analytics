import { IconButton, styled } from "@mui/material";

export const CloseModalButton = styled(IconButton)(() => ({
  position: "absolute",
  top: "8px",
  right: "8px",
  backgroundColor: "rgb(255,0,0)",
  borderRadius: "50%",
  transition: "background-color 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "rgb(255,0,0)",
  },
}));
