import { TotalsViewerContainer } from "../../chart_dashboard/chart_totals/styled_totals_viewer";
interface TotalsViewerInput {
  name: string;
  value: number;
}
export const TotalsViewer: React.FC<TotalsViewerInput> = ({ name, value }) => {
  return (
    <TotalsViewerContainer>
      <h1>{name}</h1>
      <h1>{value.toFixed(2)}</h1>
    </TotalsViewerContainer>
  );
};
