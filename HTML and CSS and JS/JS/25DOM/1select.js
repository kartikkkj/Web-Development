console.log(window.document) //shows document object in HTML
console.dir(document)//showa actual documnet object

// select document
document.getElementById("main-heading")//return a Object

console.log(document.getElementById("main-heading"))
console.dir(document.getElementById("main-heading"))
console.log(typeof document.getElementById("main-heading"))

const myobject=document.getElementById("main-heading")
console.log(myobject) 

// getElementsByClassName() gives array like object (HTMLCollection)
// getElementsByTagName() gives array like object (HTMLCollection)

const myQuerySelector= document.querySelector("#main-heading")// it can select by id .class html-element return first match object 

// to get all match object use querySelectorAll() which gives array like object (nodelist)
console.log(myQuerySelector)
