const TOTAL_WEEK_DAYS = 6;
const date = new Date();
export const currentDay = date.getDate();
//  Zero index based
export const currentMonth = date.getMonth();
export const currentYear = date.getFullYear();
export const fullWeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getDaysInMonth = (month = currentMonth, year = currentYear) => {
  // month is zero index based
  // 0 is the last day of previous month
  return new Date(year, month, 0).getDate();
};

export const getFirstDayWeekDay = (
  month = currentMonth,
  year = currentYear
) => {
  return new Date(year, month, 1).getDay();
};

export const getLastDayWeekDay = (month = currentMonth, year = currentYear) => {
  return new Date(year, month + 1, 0).getDay();
};

export const getYearRanges = (from = 1900) => {
  const to = 2050;
  const length = to + 1 - from;
  return Array.from({ length }, (_, i) => from + i);
};

export const getPreviousMonthDays = (
  month = currentMonth,
  year = currentYear
) => {
  const firstWeekday = getFirstDayWeekDay();
  const daysInPrevMonth = getDaysInMonth(month + 1, year);
  //  Subtract TOTAL_WEEK_DAYS from firstWeekDay
  const start = firstWeekday - TOTAL_WEEK_DAYS;
  return Array.from({ length: daysInPrevMonth }, (_, i) => ++i).slice(start);
};

export const getNextMonthDays = (month = currentMonth, year = currentYear) => {
  //  Add 2 to month since month in JS is 0 based i.e. Jan = 0, Feb = 1
  const nextMonth = month + 2;
  const lastWeekday = getLastDayWeekDay();
  const daysInNextMonth = getDaysInMonth(nextMonth, year);
  //  Subtract lastWeekDay from TOTAL_WEEK_DAYS
  let end = TOTAL_WEEK_DAYS - lastWeekday;
  return Array.from({ length: daysInNextMonth }, (_, i) => ++i).slice(0, end);
};
