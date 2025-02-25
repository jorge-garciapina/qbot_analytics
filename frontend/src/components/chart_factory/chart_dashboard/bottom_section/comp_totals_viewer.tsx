import { TotalsViewerContainer } from "../../../../mui_configurations/styled_components/chart_sections/bottom_section/styled_totals_viewer";

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
