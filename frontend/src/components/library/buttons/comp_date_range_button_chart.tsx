import { ValidGranularities } from "../../../common/types";

import { Button, styled } from "@mui/material";

const DateRangeButton = styled(Button)(() => ({
  backgroundColor: "rgb(255,0,0)",
  "&:hover": {
    backgroundColor: "rgb(255,100,0)",
  },
}));

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
