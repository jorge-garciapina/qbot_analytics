import { ModalChartUpperSectionContainer } from "./styled_modal_chart_upper_container";

import { ValidGranularities } from "../../../../common/types";
import { ChartHeader, DateSelectors } from "../../partials";

interface UpperSectionDataInput {
  title: string;
  initialDateModifier: (date: string) => void;
  endDateModifier: (date: string) => void;
  granularityModifier: (newGranularity: ValidGranularities) => void;
  initialDate: string;
  endDate: string;
}

export const UpperSectionDataModal: React.FC<UpperSectionDataInput> = ({
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
