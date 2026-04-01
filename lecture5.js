
function printDate() {
    const x = 5;

    document.getElementById('modifyThis').innerHTML = (x === '5')
    
    const today = new Date().getDay();
    /**if(today === 0) {
        console.log('Sunday')
        document.getElementById('dayOfWeek').innerHTML = "Sunday"
    } else if(today === 1) {
        console.log('Monday')
        document.getElementById('dayOfWeek').innerHTML = "Monday"
    } else if(today === 2) {
        console.log('Tuesday')
        document.getElementById('dayOfWeek').innerHTML = "Tuesday"
    } else if(today === 3) {
        console.log('Wednesday')
        document.getElementById('dayOfWeek').innerHTML = "Wednesday"
    } else if(today === 4) {
        console.log('Thursday')
        document.getElementById('dayOfWeek').innerHTML = "Thursday"
    } else if(today === 5) {
        console.log('Friday')
        document.getElementById('dayOfWeek').innerHTML = "Friday"
    } else if(today === 6) {
        console.log('Saturday')
        document.getElementById('dayOfWeek').innerHTML = "Saturday"
    } 
        */

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
document.getElementById('dayOfWeek').innerHTML = daysOfWeek[today]

    
}



const randomNum = 10; 
/** 
let value = '';
if(randomNum > 5) {
    value = 'Number is > 5'
} else {
    value = "Number is < 5"
}
    */

function arrayOperation() {
    const value = (randomNum > 5) ? 'Number is > 5' : 'Number is < 5'
console.log(value)



//Array Logic
const coolWords = ['Swag', 'Yeet']
console.log(coolWords)

coolWords.push('Bet')
console.log('coolWords Push: ', coolWords)

coolWords.pop()
console.log('coolWords Pop: ', coolWords)

console.log('coolWords Last Element: ', coolWords[coolWords.length-1])

//objects
const randomVariable = ['name', 'age']
const nameObject = {name: 'Brea', age: 20, name: 'Bob'}
console.log('Name Object:', nameObject)
console.log('Name Object - Name:', nameObject.name)
console.log('Name Object - Age:', nameObject[randomVariable[1]])

const numArray = [1, 2, 3, 65, 32, 41, 1]
for(let i = 0; i < numArray.length; i++) {
    if(numArray[i] > 50) {
        console.log(`number at position ${i} > 50`)
    } else {
        console.log(`number at position ${i} <= 50`)
    }
}


for(let i = 0; i < numArray.length; i++) {
    if(numArray[i] > 50) {
        continue;
    }
    console.log('Number is: ', numArray[i])
}

let iteration = 0
while(iteration < coolWords.length) {
    console.log(`coolWords at ${iteration} is ${coolWords[iteration]}`)
    iteration += 1
}
}

function turnOffBulb(){
    document.getElementById("bulbImage").src = "bulbOff.png"
    document.body.style.backgroundColor = "white"
    document.getElementById("dayOfWeek").style.display = 'block';
}

function turnOnBulb() {
    document.getElementById("bulbImage").src = "bulbOn.png"
    document.body.style.backgroundColor = "yellow"
    document.getElementById("dayOfWeek").style.display = 'none';
}

window.onload = function() {
    printDate();
    arrayOperation();
}
