import { ActionToolbarDashboardChartContainer } from "../../../../mui_configurations/styled_components/chart_sections/upper_section/styled_action_tool_bar_dashboard_chart";
// import { DropDownMenuChart } from "../../../library/comp_drop_down_menu_chart";
import { DateRangeButtonChart } from "../../../library/buttons/comp_date_range_button_chart";
import { DateRangeSelector } from "../../../date_related_components/date_range_selector/comp_range_selector";
import { ValidGranularities } from "../../../../hooks";
interface ActionToolbarInput {
  initialDateModifier: (date: string) => void;
  endDateModifier: (date: string) => void;
  granularityModifier: (newGranularity: ValidGranularities) => void;
  initialDate: string;
  endDate: string;
}
// Example Usage
export const ActionToolbar: React.FC<ActionToolbarInput> = ({
  initialDateModifier,
  endDateModifier,
  granularityModifier,
  initialDate,
  endDate,
}) => {
  return (
    <ActionToolbarDashboardChartContainer>
      {/* <DropDownMenuChart /> */}
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
    </ActionToolbarDashboardChartContainer>
  );
};
