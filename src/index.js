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
const fullYear = new Date().getFullYear();
const weekDays = Array.from({ length: 7 }, (_, i) => i);
const fullWeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getDaysInMonth = (month, year = fullYear) => {
  // month is zero based
  return new Date(year, month, 0).getDate(); // 0 is the last day of prev month
};

const getFirstDayWeekDay = (month, year = fullYear) => {
  const jsMonth = month > 11 ? month - (month - 11) : month;
  // console.log("jsMonth", jsMonth, "month", month - (month % 11));

  return new Date(year, month, 1).getDay();
};

const getLastDayWeekDay = (month, year = fullYear) => {
  return new Date(year, month + 1, 0).getDay();
};

const generateMonthHeader = () => {
  const tr = document.createElement("tr");
  const thead = document.createElement("thead");
  fullWeekDays.forEach((day) => {
    const th = document.createElement("th");
    th.textContent = day;
    tr.appendChild(th);
  });

  thead.appendChild(tr);
  table.appendChild(thead);
};

const generateDaysBody = () => {
  const lastDay = getLastDayWeekDay(0, 2021);
  const totalDaysInMonth = getDaysInMonth(1);
  const firstDay = getFirstDayWeekDay(0, 2021);
  const tbody = document.createElement("tbody");
  // console.log(firstDay);
  // console.log(fullWeekDays[firstDay]);
  let tRow = tbody.insertRow();

  for (let index = 1 - firstDay; index <= totalDaysInMonth; index++) {
    const td = document.createElement("td");
    const isClickable = index > 0;
    const count = index + firstDay;
    td.textContent = isClickable ? index : "";
    isClickable && td.classList.add("pointer");

    if (count % 7 == 1) {
      tRow = tbody.insertRow();
    }
    tRow.appendChild(td);
  }

  tbody.appendChild(tRow);
  table.appendChild(tbody);
};

const createTable = () => {
  generateMonthHeader();
  generateDaysBody();

  const container = document.createElement("div");
  const row = document.createElement("div");
  container.classList.add("container");
  row.classList.add("row");
  row.appendChild(table);
  container.appendChild(row);
  document.getElementById("app").append(container);
};

// console.log("getDaysInMonth", getDaysInMonth(2));
// console.log("firstDay", firstDay);
// console.log("lastDay", lastDay);
// console.log("weekDays", weekDays);
// console.log("getFirstDayWeekDay", getFirstDayWeekDay(2020, 11));
// console.log("getLastDayWeekDay", getLastDayWeekDay(2020, 11));
// console.log("firstFullWeekDay", fullWeekDays[getFirstDayWeekDay(11)]);
// console.log("lastFullWeekDay", fullWeekDays[getLastDayWeekDay(11)]);
getFirstDayWeekDay(14);
createTable();
