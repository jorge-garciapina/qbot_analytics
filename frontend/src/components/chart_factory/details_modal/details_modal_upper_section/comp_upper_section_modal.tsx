import { ModalChartUpperSectionContainer } from "../../../../mui_configurations/styled_components/chart_sections/upper_section/styled_modal_chart_upper_container";
import { DateSelectors } from "../../partials/date_selectors/comp_date_selectors";
import { ChartHeader } from "../../partials/chart_header/comp_chart_header";

import { ValidGranularities } from "../../../../hooks";

interface UpperSectionInput {
  title: string;
  initialDateModifier: (date: string) => void;
  endDateModifier: (date: string) => void;
  granularityModifier: (newGranularity: ValidGranularities) => void;
  initialDate: string;
  endDate: string;
}

export const UpperSectionModal: React.FC<UpperSectionInput> = ({
  title,
  initialDateModifier,
  endDateModifier,
  granularityModifier,
  initialDate,
  endDate,
}) => {
  return (
    <ModalChartUpperSectionContainer>
      <ChartHeader title={title} />
      <DateSelectors
        initialDateModifier={initialDateModifier}
        endDateModifier={endDateModifier}
        granularityModifier={granularityModifier}
        initialDate={initialDate}
        endDate={endDate}
      />
    </ModalChartUpperSectionContainer>
  );
};
