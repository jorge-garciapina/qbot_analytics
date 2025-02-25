import { Container, styled } from "@mui/material";
export const ChartContainer = styled(Container)(({ theme }) => ({
  backgroundColor: "yellow",
  borderColor: theme.palette.secondary.dark,
  borderWidth: "5px",
  border: "solid",
}));
