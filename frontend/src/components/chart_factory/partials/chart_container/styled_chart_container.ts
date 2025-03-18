import { Container, styled } from "@mui/material";

export const ChartMiddleSectionContainer = styled(Container)(({ theme }) => ({
  // backgroundColor: "cadetblue",
  backgroundColor: theme.palette.test.main,
  borderColor: theme.palette.secondary.dark,
  borderWidth: "5px",
  border: "solid",
}));
