// Resource
const monthSelect = document.querySelector("#month");
const dateSelect = document.querySelector("#date");
const formInput = document.querySelector("#form-input");
const output = document.querySelector("#output");

// Month
const month = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const renderMonth = () => {
  let html = `<option selected>Masukkan Bulan</option>`;
  month.forEach((m) => {
    html += /*html*/ `
    <option value="${m}" class="text-capitalize">${m}</option>
    `;
  });
  return html;
};
monthSelect.innerHTML = renderMonth();

// Date
const date = [];
monthSelect.addEventListener("change", () => {
  switch (monthSelect.value) {
    case "january":
    case "march":
    case "may":
    case "july":
    case "august":
    case "october":
    case "december":
      date.length = 0;
      for (let i = 1; i <= 31; i++) {
        date.push(i);
      }
      dateSelect.removeAttribute("disabled");
      break;
    case "april":
    case "june":
    case "september":
    case "november":
      date.length = 0;
      for (let i = 1; i <= 30; i++) {
        date.push(i);
      }
      dateSelect.removeAttribute("disabled");
      break;
    case "february":
      date.length = 0;
      for (let i = 1; i <= 29; i++) {
        date.push(i);
      }
      dateSelect.removeAttribute("disabled");
      break;
    default:
      date.length = 0;
      dateSelect.setAttribute("disabled", "");
  }
  const renderDate = () => {
    let html = "";
    date.forEach((d) => {
      html += /*html*/ `
      <option value="${d}" class="text-capitalize">${d}</option>
      `;
    });
    return html;
  };
  dateSelect.innerHTML = renderDate();
});

// Event Submit
formInput.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("zodiac.json")
    .then((res) => res.json())
    .then((data) => {
      const zodiac = data.zodiac;
      let result = "";
      switch (monthSelect.value) {
        case "january":
          dateSelect.value >= 20 ? (result = "aquarius") : (result = "capricorn");
          break;
        case "february":
          dateSelect.value >= 19 ? (result = "pisces") : (result = "aquarius");
          break;
        case "march":
          dateSelect.value >= 21 ? (result = "aries") : (result = "pisces");
          break;
        case "april":
          dateSelect.value >= 20 ? (result = "taurus") : (result = "aries");
          break;
        case "may":
          dateSelect.value >= 21 ? (result = "gemini") : (result = "taurus");
          break;
        case "june":
          dateSelect.value >= 21 ? (result = "cancer") : (result = "gemini");
          break;
        case "july":
          dateSelect.value >= 23 ? (result = "leo") : (result = "cancer");
          break;
        case "august":
          dateSelect.value >= 23 ? (result = "virgo") : (result = "leo");
          break;
        case "september":
          dateSelect.value >= 23 ? (result = "libra") : (result = "virgo");
          break;
        case "october":
          dateSelect.value >= 23 ? (result = "scorpio") : (result = "libra");
          break;
        case "november":
          dateSelect.value >= 22 ? (result = "sagitarius") : (result = "scorpio");
          break;
        case "december":
          dateSelect.value >= 22 ? (result = "capricorn") : (result = "sagitarius");
          break;
        default:
          output.innerHTML = `<h2 class="text-capitalize">zodiakmu adalah...</h2>`;
      }
      zodiac.forEach((z) => {
        if (z.name === result) {
          output.innerHTML = renderResult(z.name, z.date, z.description);
        }
      });
    });
});

// Function renderResult
const renderResult = (name, date, description) => {
  return /*html*/ `
  <div>
    <h2 class="text-capitalize">${name}</h2>
    <h4>Tanggal : ${date}</h4>
    <p>${description}</p>
  </div>
  `;
};
