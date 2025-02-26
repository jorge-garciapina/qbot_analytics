import { useState } from "react";

export type ValidGranularities =
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly";

export function useDateGranularity() {
  const [granularity, setGranularity] = useState<ValidGranularities>("monthly");
  function updateGranularity(newGranularity: ValidGranularities) {
    setGranularity(newGranularity);
  }

  return {
    granularity: granularity,
    updateGranularity,
  };
}
