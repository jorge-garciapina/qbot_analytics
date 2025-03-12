import { DateSelectorsDashboardChartContainer } from "./styled_date_selectors";
import { DateRangeButtonChart } from "../../../library/buttons/comp_date_range_button_chart";
import { DateRangeSelector } from "../../../date_related_components/comp_range_selector";
import { ValidGranularities } from "../../../../hooks";
interface ActionToolbarInput {
  initialDateModifier: (date: string) => void;
  endDateModifier: (date: string) => void;
  granularityModifier: (newGranularity: ValidGranularities) => void;
  initialDate: string;
  endDate: string;
}
// Example Usage
export const DateSelectors: React.FC<ActionToolbarInput> = ({
  initialDateModifier,
  endDateModifier,
  granularityModifier,
  initialDate,
  endDate,
}) => {
  return (
    <DateSelectorsDashboardChartContainer>
      <DateRangeButtonChart
        granularityModifier={granularityModifier}
        granularity={"daily"}
        buttonText={"Daily"}
      />
      <DateRangeButtonChart
        granularityModifier={granularityModifier}
        granularity={"monthly"}
        buttonText={"Monthly"}
      />
      <DateRangeButtonChart
        granularityModifier={granularityModifier}
        granularity={"yearly"}
        buttonText={"Yearly"}
      />
      <DateRangeSelector
        initialDateModifier={(date) => {
          initialDateModifier(date);
        }}
        endDateModifier={(date) => {
          endDateModifier(date);
        }}
        initialDate={initialDate}
        endDate={endDate}
      />
    </DateSelectorsDashboardChartContainer>
  );
};
