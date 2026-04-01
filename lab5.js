function populate(){
    const fromCurrencySelect = document.getElementById("fromCurrency")
    const toCurrencySelect = document.getElementById("toCurrency")
    fetch("https://api.frankfurter.app/currencies")
    .then((res) => res.json())
    .then((resJson) => {
        console.log('Response JSON: ', resJson)

        Object.entries(resJson).forEach(([key, value]) => {
            const fromOption = document.createElement("option")
            fromOption.value = key;
            fromOption.innerHTML = value;
            fromCurrencySelect.appendChild(fromOption)
        })

        Object.entries(resJson).forEach(([key, value]) => {
            const toOption = document.createElement("option")
            toOption.value = key;
            toOption.innerHTML = value;
            toCurrencySelect.appendChild(toOption)
        })
    })
}


function addObj(){
    const toCurrencyInput = document.getElementById("toCurrency").value
    const fromInput = document.getElementById("fromCurrency").value
    const amount = document.getElementById("number").value

    if(toCurrencyInput == fromInput){
        alert('You cannot convert to and from the same currency!')
    }


    fetch(`https://api.frankfurter.app/latest?base=${fromInput}&symbols=${toCurrencyInput}`)
    .then((resp) => resp.json())
    .then((data) => {
      const convertedAmount = (amount * data.rates[toCurrencyInput]).toFixed(2);
      const text = document.createElement("p");
      text.innerHTML = `${amount} ${fromInput} = ${convertedAmount} ${toCurrencyInput}`;
      document.querySelector("body").appendChild(text)

    });
}

    





window.onload = populate;
