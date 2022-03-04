//Array distructuring
const arr= ['value1', "value2", "value3"]
//distructuring into variable
let [myvar1,myvar2]= arr; // value 3 is not stored in any variable if you try to make variable more than element in array then remaining variable will undefined.
console.log(myvar1,myvar2)
let [v1,,v2]=arr;// it willl skip value2
let [va1,va2,...newArray]=arr; // newArray



// Object Destructuring
const obj= {
    key1: "value1",
    key2: "value2",
    key3: "value3"
}
let {key1:var1,key2,key3,...restKeys}= obj// other things are similar to  array destruction
// restKeys is a object





//Parameter distructuring
 const person={
     firstName:"Abhishek",
     gender:"male",
     age:54
 }

 function des({firstName,gender,age}){
     console.log(firstName)
     console.log(gender)
     console.log(age)
 }
 des(person)
 //similarly in array
 



//their is nested destucture.
