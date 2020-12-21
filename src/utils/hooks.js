import { monthNames } from "./date";

export const useActive = () => {
  const month = document.getElementById("month");
  const year = document.getElementById("year");
  const activeMonth = month.textContent;
  const activeYear = +year.textContent;
  const activeMonthIndex = monthNames.findIndex(
    (month) => month === activeMonth
  );

  return { activeMonthIndex, activeYear };
};
