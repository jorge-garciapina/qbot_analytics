import { TotalsViewerContainer } from "./styled_totals_viewer";
import { Typography } from "@mui/material";
interface TotalsViewerInput {
  name: string;
  value: number;
}
export const TotalsViewer: React.FC<TotalsViewerInput> = ({ name, value }) => {
  return (
    <TotalsViewerContainer>
      <Typography variant="h5">{name}</Typography>
      <Typography variant="h5">{value.toFixed(2)}</Typography>
    </TotalsViewerContainer>
  );
};
