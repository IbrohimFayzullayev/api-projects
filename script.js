let select1 = document.querySelector(".cur__1");
let select2 = document.querySelector(".cur__2");
let convert = document.querySelector(".convert");
let usetInput = document.querySelector(".currency__1");
let result = document.querySelector(".currency__2");
let dateText = document.querySelector(".date");
fetch(
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (res) {
    for (let [key, val] of Object.entries(res)) {
      let html = `<option value="${key}">${val}</option>`;
      select1.insertAdjacentHTML("beforeend", html);
      select2.insertAdjacentHTML("beforeend", html);
    }
  });

let convertCurrency = function (cur1, cur2) {
  fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${cur1}.json`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (res) {
      dateText.textContent = ` Updated: ${String(res.date)
        .split("-")
        .join(".")}`;
      let obj;
      for (let [key, val] of Object.entries(res)) {
        obj = val;
      }
      let num;
      for (let [key, val] of Object.entries(obj)) {
        if (key === cur2) {
          num = val;
        }
      }
      result.value = (Number(usetInput.value) * num).toFixed(3);
    });
};

usetInput.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    convertCurrency(select1.value, select2.value);
  }
});
convert.addEventListener("click", function (e) {
  e.preventDefault();
  convertCurrency(select1.value, select2.value);
});

select1.addEventListener("change", function (e) {
  e.preventDefault();
  convertCurrency(select1.value, select2.value);
});
select2.addEventListener("change", function (e) {
  e.preventDefault();
  convertCurrency(select1.value, select2.value);
});
convertCurrency(select1.value, select2.value);
