import {
  currentDay,
  currentMonth,
  currentYear,
  fullWeekDays,
  getDaysInMonth,
  getFirstDayWeekDay,
  getLastDayWeekDay,
  getYearRanges,
  monthNames,
} from "./utils/date";
import { useActive } from "./utils/hooks";
import "./styles.css";

// console.log(getYearRanges());

const pad = (val) => (val > 0 && val < 10 ? `0${val}` : `${val}`);

function enableClick(month = currentMonth, year = currentYear) {
  const tds = document.getElementsByTagName("td");
  const clickables = Array.from(tds).filter((td) => td.textContent);

  clickables.forEach((td) => {
    td.addEventListener("click", (event) => {
      const currentSelection = event.target;
      const selectedDay = currentSelection.textContent;
      const activeTd = clickables.find((td) => td.classList.contains("active"));
      activeTd && activeTd.classList.remove("active");
      currentSelection.classList.add("active");
      const humanMonth = month + 1;
      const fullDate = `${year}/${pad(humanMonth)}/${pad(selectedDay)}`;
      console.log("Selected date", fullDate);
    });
  });
}

const generateTableHead = (month, year, table) => {
  const tr = document.createElement("tr");
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th colspan="7">
        <div class="d-flex justify-content-between">
          <a class="btn btn-outline-primary btn-sm" id="prev"><i class="bi bi-chevron-left"></i></a>
          <a class="btn btn-outline-primary btn-sm" id="month">${monthNames[month]}</a>
          <a class="btn btn-outline-primary btn-sm" id="year">${year}</a>
          <a class="btn btn-outline-primary btn-sm" id="next"><i class="bi bi-chevron-right"></i></a>
        </div>
      </th>
    </tr>
  `;

  fullWeekDays.forEach((day) => {
    const th = document.createElement("th");
    th.textContent = day;
    tr.appendChild(th);
  });

  thead.appendChild(tr);
  table.appendChild(thead);
};

const generateTableBody = (month, year, table) => {
  const totalWeekdays = 6; // zero based index
  const lastDay = getLastDayWeekDay(month, year);
  const totalDaysInMonth = getDaysInMonth(month + 1);
  const firstDay = getFirstDayWeekDay(month, year);
  const tbody = document.createElement("tbody");
  let tRow = tbody.insertRow();
  let start = 1 - firstDay;
  const end = totalDaysInMonth + (totalWeekdays - lastDay);

  for (start; start <= end; start++) {
    const td = document.createElement("td");
    const isClickable = start > 0 && start <= totalDaysInMonth;
    const count = start + firstDay;
    td.classList.add("text-center");
    td.textContent = isClickable ? start : "";
    isClickable && td.classList.add("pointer");
    start === currentDay &&
      month === currentMonth &&
      year === currentYear &&
      td.classList.add("today");

    if (count % 7 === 1) {
      tRow = tbody.insertRow();
    }

    tRow.appendChild(td);
  }

  tbody.appendChild(tRow);
  table.appendChild(tbody);
};

const createTable = (month, year) => {
  const table = document.createElement("table");
  table.classList.add("table");
  table.classList.add("table-sm");
  table.classList.add("table-borderless");
  // table.classList.add("table-bordered");
  table.classList.add("table-striped");
  generateTableHead(month, year, table);
  generateTableBody(month, year, table);

  const container = document.createElement("div");
  const row = document.createElement("div");
  container.classList.add("container");
  row.classList.add("row");
  row.appendChild(table);
  container.appendChild(row);
  const wrapper = document.createElement("div");
  wrapper.appendChild(container);

  const app = document.getElementById("app");
  app.innerHTML = wrapper.innerHTML;

  //  Enable click handlers
  enableClick();
  enableButtonClick();
};

createTable(currentMonth, currentYear);

let prevIndex;
let nextIndex;
const END_INDEX = 11;
const START_INDEX = 0;

function enableButtonClick() {
  //  Previous button handler
  document.getElementById("prev").addEventListener("click", () => {
    const { activeMonthIndex, activeYear } = useActive();
    prevIndex = activeMonthIndex - 1;
    const monthIndex = prevIndex < START_INDEX ? END_INDEX : prevIndex;
    const visibleYear = prevIndex < START_INDEX ? activeYear - 1 : activeYear;
    createTable(monthIndex, visibleYear);
    prevIndex = prevIndex < START_INDEX ? END_INDEX : prevIndex;
  });

  //  Next button handler
  document.getElementById("next").addEventListener("click", () => {
    const { activeMonthIndex, activeYear } = useActive();
    nextIndex = activeMonthIndex + 1;
    const monthIndex = nextIndex > END_INDEX ? START_INDEX : nextIndex;
    const visibleYear = nextIndex > END_INDEX ? activeYear + 1 : activeYear;
    createTable(monthIndex, visibleYear);
    nextIndex = nextIndex > END_INDEX ? START_INDEX : nextIndex;
  });
}
