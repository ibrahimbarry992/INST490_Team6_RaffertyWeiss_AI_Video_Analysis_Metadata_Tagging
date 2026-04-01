function jsonManipulation(){
    const person = {
        //how to make a JSON object
        "name": "Brea Bernardino",
        "email": "breabern@terpmail.umd.edu",
        "gradYear": "2026"
    }

    //Stringify and Print JSON object
    const stringified = JSON.stringify(person)
    console.log('Non-Stringified:' , person)
    console.log('Stringified:', stringified)

    //Access elements in object

    const reParsed = JSON.parse(stringified)
    console.log('ReParsed: ', reParsed)

    console.log('Store Name: ', reParsed.name)
    console.log('Array Stored Name: ', reParsed["name"]) 

    console.log('Random Element: ', reParsed[returnRandomSelection()])
}

function returnRandomSelection() {
    const fieldToSelect = ["name", "email", "gradYear"]
    const randomSelection = fieldToSelect[Math.floor(Math.random() * (fieldToSelect.length))]
    return randomSelection;
}

window.onload = jsonManipulation