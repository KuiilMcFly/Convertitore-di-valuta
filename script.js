//Selezionare elementi

//onload

const select = document.querySelectorAll(".currency");
const btn = document.getElementById("btn-converter");
const num = document.getElementById("conversion-form");
const result = document.getElementById("result");

//chiamare API

async function currencyOptions() {
  try {
    const response = await fetch("https://api.frankfurter.app/currencies");
    const data = await response.json();
    display(data);
  } catch (error) {
    console.log(error);
  }
}

window.onload = function () {
  currencyOptions();
};

//Mostrare opzioni valute selezionabili dall'API
const countries1 = select[0];
const countries2 = select[1];

function display(data) {
  const entries = data;
  for (const entry in entries) {
    console.log(entry);
    countries1.innerHTML += `<option value="${entry}">${entry}</option>`;
    countries2.innerHTML += `<option value="${entry}">${entry}</option>`;
  }
}

//Aggiungere Event on click quando viene cliccato tasto converti
btn.addEventListener("click", () => {
  let currency1 = select[0].value;
  let currency2 = select[1].value;
  let value = num.value;

  if (currency1 !== currency2) {
    convert(currency1, currency2, value);
  } else {
    alert("Scegli una valuta diversa");
  }
});

//Definire il tasto converti
async function convert(currency1, currency2, value) {
  const host = "api.frankfurter.app";
  await fetch(
    `https://${host}/latest?amount=${value}&from=${currency1}&to=${currency2}`
  )
    .then((val) => val.json())
    .then((val) => {
      console.log(Object.values(val.rates)[0]);
      result.value = Object.values(val.rates)[0];
    });
}
