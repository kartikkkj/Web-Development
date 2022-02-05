// static list Vs live list

//static list example
const lis= document.querySelectorAll(".todoList li") // gives static list
const newli=document.createElement("li")
newli.textContent="todo2"
const ul= document.querySelector(".todoList")
ul.append(newli)
// const li1s= document.querySelectorAll(".todoList li")
console.log(lis)//not added in nodeList new element added


// live list example
const ul2= document.querySelector(".todoList")
const lis1= ul2.getElementsByTagName("li")
const newli1=document.createElement("li")
newli1.textContent="todo3"
const ul1= document.querySelector(".todoList")
ul.append(newli1)
console.log(lis1)//added in HTMLCollection new element added