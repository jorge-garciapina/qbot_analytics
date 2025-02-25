import { Typography, styled } from "@mui/material";

export const ChartTitleContainer = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "1.0rem",
  fontFamily: "'Roboto', 'Arial', sans-serif",
  color: theme.palette.primary.contrastText,
}));
