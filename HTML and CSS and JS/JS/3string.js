

var variable= "wo Chutiye kesa h"
for (let i = 0; i < variable.length; i++) {
    console.log(i+" "+variable[i])
}

// String is immutable

let num= 54;
console.log(typeof(num));
num=num+"" // this will changes the num from number into string
console.log(typeof(num))




var age= "56"
console.log(typeof(age))
age= +age; //this will changes the age from string to number
console.log(typeof(age))
console.log(typeof age);
  



// string concatenation

let one = "Hello"
let two= "World"
console.log(one+" "+ two)
console.log(one,two)

// string Template

console.log(`Hello ${variable}! your age is ${num}`)



