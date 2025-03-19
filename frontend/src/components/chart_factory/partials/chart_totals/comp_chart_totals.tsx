import { TotalsViewer } from "./comp_totals_viewer";
import { Box, styled } from "@mui/material";

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
  return <Totals>{dynamicComponents}</Totals>;
};

const Totals = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  backgroundColor: "rgb(255,0,0)",
  borderColor: "rgb(255,0,0)",
  borderTop: "solid",
}));
