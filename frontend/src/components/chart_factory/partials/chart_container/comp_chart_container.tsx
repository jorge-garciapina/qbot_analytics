import { ReactNode } from "react";
import { ChartMiddleSectionContainer } from "./styled_chart_container";

interface ChartContainerProps {
  children: ReactNode; // Accepts ReactECharts or any other chart component
}

/**
 * ChartContainer is a reusable component that wraps a chart component.
 * It replaces ChartMiddleSectionContainer and is designed to be used in multiple places.
 *
 * @param children - The chart component (e.g., ReactECharts) to be displayed inside the container.
 */
export const ChartContainer: React.FC<ChartContainerProps> = ({ children }) => {
  return <ChartMiddleSectionContainer>{children}</ChartMiddleSectionContainer>;
};
