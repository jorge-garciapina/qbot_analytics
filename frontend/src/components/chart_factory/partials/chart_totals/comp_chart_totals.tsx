import { Typography } from "@mui/material";
import { ChartTotalsContainer } from "./styled_chart_totals";
import { TotalsViewer } from "./comp_totals_viewer";
interface ChartTotal {
  name: string;
  value: number;
}

export const ChartTotals: React.FC<{
  footerSummaryInTimeInterval: ChartTotal[];
}> = ({ footerSummaryInTimeInterval }) => {
  const dynamicComponents = footerSummaryInTimeInterval.map(
    (element, index) => (
      <TotalsViewer key={index} name={element.name} value={element.value} />
    )
  );
  return (
    <ChartTotalsContainer>
      <Typography variant="h3">Bottom</Typography>
      {dynamicComponents}
    </ChartTotalsContainer>
  );
};
