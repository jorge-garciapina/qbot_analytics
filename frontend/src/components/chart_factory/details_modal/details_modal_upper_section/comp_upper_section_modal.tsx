import { ModalChartUpperSectionContainer } from "../../data_modal/data_modal_upper_section/styled_modal_chart_upper_container";
import { ChartHeader, DateSelectors } from "../../partials";

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
