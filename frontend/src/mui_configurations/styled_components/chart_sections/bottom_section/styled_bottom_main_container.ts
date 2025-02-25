import { Container, styled } from "@mui/material";

export const BottomSectionContainer = styled(Container)(({ theme }) => ({
  backgroundColor: "green",
  borderColor: theme.palette.secondary.dark,
  borderWidth: "5px",
  border: "solid",
}));
