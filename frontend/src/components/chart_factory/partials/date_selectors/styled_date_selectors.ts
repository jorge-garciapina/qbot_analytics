import { Container, styled } from "@mui/material";

export const DateSelectorsDashboardChartContainer = styled(Container)(() => {
  return {
    display: "flex",
    alignItems: "center", // Corrected camelCase for align-items
    justifyContent: "flex-end", // Corrected camelCase and added quotes for flex-end
    gap: "16px", // Added quotes for numeric value with units
    padding: "8px 16px", // Added quotes for padding
    backgroundColor: "rgb(255,0,0)", // Corrected camelCase for background-color
    borderBottom: "1px solid #e0e0e0", // Corrected camelCase for border-bottom
  };
});
