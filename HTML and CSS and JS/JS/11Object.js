const person = {
  name: "Abhishek",
  age: 43,
  arr: ["Abhi", "Arya", 54],
  "hi brother": true, // due to space between keys is only accessible using [] only
};
console.log(person);
console.log(person.arr);
console.log(person["gender"]);
person.gender = "male"; // to add new key value pair
person["nick_name"] = "Arya"; // to add new key value pair
console.log(person);

console.log(Object.keys(person));

for (const keys in person) {
  console.log(person[keys]);
}

for (const value of Object.values(person)) {
  console.log(value);
}

// computed properties

let a = "jks";
let b = "jks";

let c = "dsjkflj";
let d = "dksjfd";

const obj = {
  [a]: c,
  [b]: d,
};
console.log(obj);

// making array with different reference
const obj2 = Object.assign({}, obj);
console.log(obj2);
//spread operator is same as in array

//optional chaining
const users = {
  firstName: "Abhishek",
  adresss: { houseNo: 24432 },
};
console.log(users?.firstName);
console.log(users?.adresss?.houseNo);

//Function inside Object
const myDetail = {
  firstName: "Abhi",
  age: 20,
  about: function () {
    console.log(`my name is ${this.firstName} and age is ${this.age}`); // you can not use this with arrow function because arrow function doesn't have this.
  },
};
myDetail.about();

//keys are either string or Symbol



