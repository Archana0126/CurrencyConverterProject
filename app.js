const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";


let dropdownSelect = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg")


for (let select of dropdownSelect) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    select.append(newOption);

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }

    select.addEventListener("change", (evt) => {
      updateFlag(evt.target);
    });
  }
}

 const updateExchangeRate = async () =>{
  let amount = document.querySelector("form input");
  let amtValue = amount.value;

if (amtValue === "" || amtValue < 1) {
  amtValue = 1;
  amount.value = "1";
}


 const URL = `${BASE_URL}/currencies/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();

  let rate =
    data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

  let finalAmount = amtValue * rate;

  console.log(finalAmount);
    msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`

 }

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];

  let newSource = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSource;
};

btn.addEventListener("click", (evt) => {
     evt.preventDefault();
 updateExchangeRate()
})

window.addEventListener("load" , () => {
  updateExchangeRate()
})
