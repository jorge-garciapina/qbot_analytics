import { Container, styled } from "@mui/material";

export const ModalChartUpperSectionContainer = styled(Container)(
  ({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.secondary.light,
  })
);
