import "./styles.css";

function enableClick() {
  const tds = document.getElementsByTagName("td");
  const clickables = Array.from(tds).filter((td) => td.textContent);

  clickables.forEach((td) => {
    td.addEventListener("click", (event) => {
      const currentSelection = event.target;
      const selectedDay = currentSelection.textContent;
      const activeTd = clickables.find((td) => td.classList.contains("active"));
      if (activeTd) {
        activeTd.classList.remove("active");
      }
      currentSelection.classList.add("active");
      const fullDate = `2020/12/${selectedDay}`;
      console.log("Selected date", fullDate);
    });
  });
}

const table = document.createElement("table");
table.classList.add("table-condensed");
// table.classList.add("table-bordered");
table.classList.add("table-striped");

const date = new Date();
const currentDay = date.getDate();
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();
const fullWeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
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

const getDaysInMonth = (month = currentMonth, year = currentYear) => {
  // month is zero index based
  // 0 is the last day of previous month
  return new Date(year, month, 0).getDate();
};

const getFirstDayWeekDay = (month = currentMonth, year = currentYear) => {
  return new Date(year, month, 1).getDay();
};

const getLastDayWeekDay = (month = currentMonth, year = currentYear) => {
  return new Date(year, month + 1, 0).getDay();
};

const generateMonthHeader = (month = currentMonth, year = currentYear) => {
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

const generateMonthBody = (month = currentMonth, year = currentYear) => {
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

const createTable = () => {
  generateMonthHeader();
  generateMonthBody();

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

createTable();
