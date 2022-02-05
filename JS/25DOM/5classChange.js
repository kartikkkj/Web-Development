//  how to change classes from element
const sectionTodo = document.querySelector(".todo-section")
console.log(sectionTodo.classList)
sectionTodo.classList.add("bg-dark")
console.log(sectionTodo.classList)
sectionTodo.classList.remove("container")
console.log(sectionTodo.classList)
console.log(sectionTodo.classList.contains("container"))
sectionTodo.classList.toggle("bg-dark")

