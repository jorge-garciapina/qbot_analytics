import { useEffect } from "react";
import {
  useDate,
  useDateGranularity,
  ValidGranularities,
} from "../../../hooks";

interface UseGranularityLogicOutput {
  granularity: ValidGranularities;
  granularityModifier: (newGranularity: ValidGranularities) => void;
  initialDate: string;
  endDate: string;
  initialDateModifier: (date: string) => void;
  endDateModifier: (date: string) => void;
}

export function useGranularityLogic(
  initialDate: string,
  endDate: string
): UseGranularityLogicOutput {
  const granularityLogic = useDateGranularity();
  const initialDayLogic = useDate(initialDate);
  const endDayLogic = useDate(endDate);

  useEffect(() => {
    if (granularityLogic.granularity === "yearly") {
      initialDayLogic.updateDate(initialDate);
      endDayLogic.updateDate(endDate);
    } else if (granularityLogic.granularity === "monthly") {
      initialDayLogic.updateDate("2021-10-01T06:00:00.000Z");
      endDayLogic.updateDate("2022-05-30T06:00:00.000Z");
    } else if (granularityLogic.granularity === "daily") {
      initialDayLogic.updateDate("2022-12-25T00:00:00.000Z");
      endDayLogic.updateDate("2023-01-06T00:00:00.000Z");
    }
  }, [granularityLogic.granularity, initialDate, endDate]);

  function granularityModifier(newGranularity: ValidGranularities) {
    granularityLogic.updateGranularity(newGranularity);
  }

  return {
    granularity: granularityLogic.granularity,
    granularityModifier,
    initialDate: initialDayLogic.date,
    endDate: endDayLogic.date,
    initialDateModifier: initialDayLogic.updateDate,
    endDateModifier: endDayLogic.updateDate,
  };
}
