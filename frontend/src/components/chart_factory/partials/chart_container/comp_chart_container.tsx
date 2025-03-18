import { ReactNode } from "react";
import { Box, styled } from "@mui/material";

interface ChartContainerProps {
  children: ReactNode; // Accepts ReactECharts or any other chart component
}

/**
 * ChartContainer is a reusable component that wraps a chart component.
 * It replaces ChartHolder and is designed to be used in multiple places.
 *
 * @param children - The chart component (e.g., ReactECharts) to be displayed inside the container.
 */
export const ChartContainer: React.FC<ChartContainerProps> = ({ children }) => {
  return <ChartHolder>{children}</ChartHolder>;
};

export const ChartHolder = styled(Box)(({ theme }) => ({
  // backgroundColor: "cadetblue",
  backgroundColor: theme.palette.test.main,
  borderColor: theme.palette.secondary.dark,

  // borderWidth: "5px",
  // border: "solid",
  // height: "150px",
}));
