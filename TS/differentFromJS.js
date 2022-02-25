// tsc  to compile the ts file
console.log("Hello TS");
// 1 data types
// number
// string
// boolean    // there is no truthy and false values
function add(n1, n2, is) {
    if (is)
        return n1 + n2;
}
var num1 = "5"; // you cannot assign with another datatype once it assing with a datatype
var num2 = 2.8;
var is = true;
console.log(add(+num1, num2, is));
// Object 
var person = {
    name: "Abhishek",
    age: 21
};
console.log(person.name);
// console.log(person.some) // you cannot access key which is not in object
var person1 = {
    name: "Abhishek",
    age: 21
};
console.log(person1);
// console.log(person1.name) // you cannot do this if you are specific to the object
var person2 = {
    name: "Abhi",
    age: 21,
    some: "red",
    roll: [4, "a"]
};
person2.roll.push("ok");
console.log(person2.roll);
var perA = {
    money: [3, 5],
    book: ["ok", 5, true, "red"]
};
// Arrays
var arr = [4.6, 4, 6];
// tuple 
var tuple1 = [1, "red"];
//Enum
var Enum;
(function (Enum) {
    Enum[Enum["READONLY"] = 0] = "READONLY";
    Enum[Enum["AUTHOR"] = 5] = "AUTHOR";
    Enum["AUT"] = "Auto";
})(Enum || (Enum = {}));
;
if (Enum.READONLY === 0) {
    console.log("Ok");
}
function combine(input, as) {
    var result;
    if (typeof input === 'number')
        result = 5 * input;
    else
        result = 5 + input;
    return result;
}
console.log(combine(4, "as-n"));
console.log(combine("4", 'as-n'));
