
// how to add HTML 
//innerHTML not use always
const todoList= document.querySelector(".todoList")
todoList.innerHTML += "<li> todo2 </li>" 

//createElement();
const newelement= document.createElement("li")
const text= document.createTextNode("todo3")
newelement.appendChild(text)
// todoList.append(newelement)
console.log(newelement)
//OR
const newelement1= document.createElement("li")
newelement1.textContent="todo4"
// todoList.appendChild(newelement1) // todoList.append(newElement)
// todoList.prepend(newelement) 

const todo1= document.querySelector(".todoList li")
// console.log(todo1);
todo1.remove()
// console.log(todo1);

todoList.before(newelement)
todoList.after(newelement)

todoList.insertAdjacentHTML("afterbegin","<li>todo</li>") //afterBegin, beforeBegin, afterEnd, beforeEnd



// important methods
    // appendChild()
    // insertBefore()
    // replaceChild()
    // removeChild()
