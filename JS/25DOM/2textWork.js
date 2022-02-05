
//textContent,    gives whole text in that element
const myobj= document.querySelector("#main-heading")
console.log(myobj.textContent)
// myobj.textContent="i am changed"
console.log(myobj.textContent)


//innerText    gives text that is visible only
const myobj1= document.querySelector("#main-heading")
console.log(myobj1.innerText)

// innerHTML        gives text of selected element their inner HTML
console.log( myobj1.innerHTML)

myobj1.innerHTML="change <h1>gya</h1>"
console.log( myobj1.innerHTML)

