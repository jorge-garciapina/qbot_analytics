import { BottomSectionContainer } from "../../../../mui_configurations/styled_components/chart_sections/bottom_section/styled_bottom_main_container";
import { FooterSummaryTotalsType } from "../../../../types/data_types";
import { TotalsViewer } from "./comp_totals_viewer";
export const BottomSection: React.FC<{
  footerSummaryInTimeInterval: FooterSummaryTotalsType;
}> = ({ footerSummaryInTimeInterval }) => {
  // Function to generate components dynamically
  const generateDynamicComponents = (
    footerSummaryInTimeInterval: FooterSummaryTotalsType
  ) => {
    return footerSummaryInTimeInterval.map((element, index) => (
      <TotalsViewer key={index} name={element.name} value={element.value} />
    ));
  };

  const dynamicComponents = generateDynamicComponents(
    footerSummaryInTimeInterval
  );
  return (
    <BottomSectionContainer>
      <h1>Bottom</h1>
      {dynamicComponents}
    </BottomSectionContainer>
  );
};
