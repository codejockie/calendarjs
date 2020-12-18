import "./styles.css";

// document.getElementById("app").innerHTML = `
// <h1>Hello Vanilla!</h1>
// <div>
//   We use the same configuration as Parcel to bundle this sandbox, you can find more
//   info about Parcel
//   <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
// </div>
// `;

// const tds = document.getElementsByTagName("td");
// const filteredTds = Array.from(tds).filter((td) => {
//   return !td.classList.contains("muted");
// });

// filteredTds.forEach((td) => {
//   td.addEventListener("click", (event) => {
//     const currentSelection = event.target;
//     const selectedDay = currentSelection.textContent;
//     const selectedTd = filteredTds.find((td) =>
//       td.classList.contains("selected")
//     );
//     if (selectedTd) {
//       selectedTd.classList.remove("selected");
//     }
//     currentSelection.classList.add("selected");
//     const fullDate = `2020/12/${selectedDay}`;
//     console.log("Selected date", fullDate);
//   });
// });

const table = document.createElement("table");
table.classList.add("table-condensed");
table.classList.add("table-bordered");
table.classList.add("table-striped");

const date = new Date();
const currentDay = date.getDate();
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();
const weekDays = Array.from({ length: 7 }, (_, i) => i);
const fullWeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getDaysInMonth = (month, year = currentYear) => {
  // month is zero based
  return new Date(year, month, 0).getDate(); // 0 is the last day of prev month
};

const getFirstDayWeekDay = (month, year = currentYear) => {
  const jsMonth = month > 11 ? month - (month - 11) : month;
  // console.log("jsMonth", jsMonth, "month", month - (month % 11));

  return new Date(year, month, 1).getDay();
};

const getLastDayWeekDay = (month, year = currentYear) => {
  return new Date(year, month + 1, 0).getDay();
};

const generateMonthHeader = () => {
  const tr = document.createElement("tr");
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th colspan="7">
        <a class="btn"><i class="icon-chevron-left"></i></a>
        <a class="btn">December</a>
        <a class="btn">2020</a>
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
  const lastDay = getLastDayWeekDay(month, year);
  const totalDaysInMonth = getDaysInMonth(month + 1);
  const firstDay = getFirstDayWeekDay(month, year);
  const tbody = document.createElement("tbody");
  let tRow = tbody.insertRow();
  let start = 1 - firstDay;

  for (start; start <= totalDaysInMonth; start++) {
    const td = document.createElement("td");
    const isClickable = start > 0;
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
};

createTable();
