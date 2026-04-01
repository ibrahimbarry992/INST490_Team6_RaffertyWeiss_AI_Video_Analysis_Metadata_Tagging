function populateForm(){
    const productSelect = document.getElementById("productId")
    fetch("https://api.restful-api.dev/objects")
    .then((res) => res.json())
    .then((resJson) => {
        console.log('Response JSON: ', resJson)

        resJson.forEach((obj) => {
            console.log('object: ', obj)
            const option = document.createElement("option")
            option.value = obj.id;
            option.innerHTML = obj.name;
            productSelect.appendChild(option)
        })
    })
}

function addObject(){
    console.log('entered add object')
    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productYear = document.getElementById("productYear").value;
    const jsonBody = JSON.stringify({
        name: `${productName}`,
        data: {
            year: `${productYear}`,
            price: `${productPrice}`
        }
    })
    
    fetch("https://api.restful-api.dev/objects", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: jsonBody 
    })
    .then((res) => res.json())
    .then((resJson) => {
        console.log("response: ", res)
    })
}



window.onload = populateForm;