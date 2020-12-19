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
import "./styles.css";

// console.log(getYearRanges());

const table = document.createElement("table");
table.classList.add("table-condensed");
// table.classList.add("table-bordered");
table.classList.add("table-striped");

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

const generateMonthHeader = (month, year) => {
  const tr = document.createElement("tr");
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th colspan="7">
        <a class="btn"><i class="icon-chevron-left"></i></a>
        <a class="btn">${monthNames[month]}</a>
        <a class="btn">${year}</a>
        <a class="btn"><i class="icon-chevron-right"></i></a>
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

const generateMonthBody = (month, year) => {
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
    start === currentDay && td.classList.add("today");

    if (count % 7 === 1) {
      tRow = tbody.insertRow();
    }

    tRow.appendChild(td);
  }

  tbody.appendChild(tRow);
  table.appendChild(tbody);
};

const createTable = (month, year) => {
  generateMonthHeader(month, year);
  generateMonthBody(month, year);

  const container = document.createElement("div");
  const row = document.createElement("div");
  container.classList.add("container");
  row.classList.add("row");
  row.appendChild(table);
  container.appendChild(row);
  document.getElementById("app").append(container);

  //  Enable click handler
  enableClick();
};

createTable(currentMonth, currentYear);
