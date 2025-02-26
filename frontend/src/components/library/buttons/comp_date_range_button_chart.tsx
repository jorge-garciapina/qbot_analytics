import { DateRangeButton } from "../../../mui_configurations/styled_components/buttons/styled_date_range_button_chart";
import { ValidGranularities } from "../../../hooks";
interface DateRangeButtonInput {
  buttonText: string;
  granularityModifier: (newGranularity: ValidGranularities) => void;
  granularity: ValidGranularities;
}

export const DateRangeButtonChart: React.FC<DateRangeButtonInput> = ({
  buttonText,
  granularityModifier,
  granularity,
}) => {
  return (
    <DateRangeButton onClick={() => granularityModifier(granularity)}>
      {buttonText}
    </DateRangeButton>
  );
};
