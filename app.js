document.addEventListener("DOMContentLoaded", function () {

    document.querySelector(".left-usd").classList.add("selected");
    document.querySelector(".right-rub").classList.add("selected");
    // document.querySelector(".selected").forEach(e=>{
    //     e.style.backgroundColor="purple"
    // })
    document.getElementById("fromAmount").addEventListener("input", convertCurrency);
    document.getElementById("toAmount").addEventListener("input", convertCurrency);

    document.querySelectorAll(".left-buttons button").forEach(button => {
        button.addEventListener("click", function () {
            selectCurrency(this, "left");
        });
    });

    document.querySelectorAll(".right-buttons button").forEach(button => {
        button.addEventListener("click", function () {
            selectCurrency(this, "right");
        });
    });
    document.getElementById("fromAmount").addEventListener("input", function () {
        if (this.value !== "") {
            convertCurrency();
        }
    });

    document.getElementById("toAmount").addEventListener("input", function () {
        if (this.value !== "") {
            convertCurrency();
        }
    });
    function convertCurrency() {
        const fromAmountInput = document.getElementById("fromAmount");
        const toAmountInput = document.getElementById("toAmount");
        const lCurrentChoice=document.querySelector(".lcurrent-choice");
        const rCurrentChoice=document.querySelector(".rcurrent-choice");
        const apiKey = "c685d64ada6397a27ee840a1";
        const fromCurrency = document.querySelector(".left-buttons .selected").textContent;
        const toCurrency = document.querySelector(".right-buttons .selected").textContent;
        if (fromAmountInput.value.length != 0) {
            const fromAmount = parseFloat(fromAmountInput.value);
            if (!isNaN(fromAmount)) {
                fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${fromAmount}`)
                    .then((resp) => resp.json())
                    .then((data) => {
                        toAmountInput.value = data.conversion_result;
                        lCurrentChoice.textContent=''
                        lCurrentChoice.textContent=`1 ${data.base_code}= ${data.conversion_rate} ${data.target_code}`
                        rCurrentChoice.textContent=''
                        let myRate=(1/data.conversion_rate).toFixed(4);
                        rCurrentChoice.textContent=`1 ${data.target_code}= ${myRate} ${data.base_code}`
                    })
                    .catch((error) => {
                        console.error("Error fetching exchange rates:", error);
                        alert("Failed to fetch exchange rates. Please try again later.");
                    });
            }
           
        } 
        else if (toAmountInput.value.length != 0) {
            // console.log("aaaa");
            const toAmount = parseFloat(toAmountInput.value);
            if (!isNaN(toAmount)) {
                fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${toAmount}`)
                    .then((resp) => resp.json())
                    .then((data) => {
                        console.log(data);
                        fromAmountInput.value = data.conversion_result
                    })
                    .catch((error) => {
                        console.error("Error fetching exchange rates:", error);
                        alert("Failed to fetch exchange rates. Please try again later.");
                    });
            }
        }
    
    }
    // convertCurrency();
});

function selectCurrency(button, side) {

    document.querySelectorAll(`.${side}-buttons button`).forEach(btn => {
        btn.classList.remove("selected");
        btn.style.backgroundColor = "transparent";
    });


    button.classList.add("selected");
    button.style.backgroundColor = "purple";


    const currency = button.textContent;
    //attention
    const oppositeSide = side === "left" ? "right" : "left";
    const oppositeCurrency = document.querySelector(`.${oppositeSide}-buttons .selected`).textContent;
    document.querySelector(`.${side}-input`).setAttribute("placeholder", `Enter amount in ${currency}`);
    document.querySelector(`.${side}-buttons .selected`).textContent = currency;
    document.querySelector(`.${side}-buttons .selected`).setAttribute("value", currency);
    document.querySelector(`.${oppositeSide}-buttons .selected`).textContent = oppositeCurrency;

    convertCurrency();
}

// document.getElementById("fromAmount").addEventListener("input", function() {
//     if (this.value !== "") {
//         convertCurrency();
//     }
// });

// document.getElementById("toAmount").addEventListener("input", function() {
//     if (this.value !== "") {
//         convertCurrency();
//     }
// });




















// HTML elements
// const fromCurrencySelect = document.getElementById("fromCurrency");
// const toCurrencySelect = document.getElementById("toCurrency");
// const fromAmountInput = document.getElementById("fromAmount");
// const toAmountInput = document.getElementById("toAmount");

// // Currency conversion function
// function convertCurrency() {
//     const fromCurrency = fromCurrencySelect.value;
//     const toCurrency = toCurrencySelect.value;
//     const fromAmount = parseFloat(fromAmountInput.value);
//     const toAmount = parseFloat(toAmountInput.value);

//     if (isNaN(fromAmount) || isNaN(toAmount)) {
//         return;
//     }

//     fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${fromAmount}`)
//         .then((resp) => resp.json())
//         .then((data) => {
//             toAmountInput.value = data.conversion_result;
//         })
//         .catch((error) => {
//             console.error("Error fetching exchange rates:", error);
//             alert("Failed to fetch exchange rates. Please try again later.");
//         });
// }

// // Event listeners
// fromCurrencySelect.addEventListener("change",convertCurrency)
// // fromCurrencySelect.addEventListener("change", convertCurrency);
// toCurrencySelect.addEventListener("change", convertCurrency);
// fromAmountInput.addEventListener("input", convertCurrency);