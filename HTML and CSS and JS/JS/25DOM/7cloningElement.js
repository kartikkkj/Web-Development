
//clone nodes
const ul= document.querySelector(".todoList")
const li= document.createElement("li")
li.textContent="todo11"
li1=li.cloneNode(true)//cloning deep if true of without true it only clone elment
ul.append(li)
ul.appendChild(li1)
