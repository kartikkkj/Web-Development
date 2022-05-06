// tsc  to compile the ts file
console.log("Hello TS")


// 1 data types
// number
// string
// boolean    // there is no truthy and false values

function add(n1: number, n2, is: boolean):number|void |never{ // function parameter should same number as passed argument while calling
    if (is)
        return n1 + n2

}

let num1 = "5"; // you cannot assign with another datatype once it assing with a datatype
const num2 = 2.8
const is: boolean = true
const unk: unknown = true
const un = undefined // not in function return type
console.log(add(+num1, num2, is));

const sum : Function = add;
const sum1 : (a:number,b:any,ok:boolean)=> number|void|never = add;

// Object 
const person = {
    name: "Abhishek",
    age: 21

}
console.log(person.name);
// console.log(person.some) // you cannot access key which is not in object

const person1: object = {
    name: "Abhishek",
    age: 21
}
console.log(person1)
// console.log(person1.name) // you cannot do this if you are specific to the object

const person2: {
    name: string,
    age: number,
    some: any,
    roll: [number, string], // tuple and push but not re-assign is allowed in and change is data-type is not allowed

} = {
    name: "Abhi",
    age: 21,
    some: "red",
    roll: [4, "a"]
}
person2.roll.push("ok")
console.log(person2.roll)
const perA = {
    money: [3, 5],
    book: ["ok", 5, true, "red"]
}


// Arrays
const arr: number[] = [4.6, 4, 6]

// tuple 
const tuple1: [number, string] = [1, "red"]

//Enum
enum Enum { READONLY, AUTHOR = 5, AUT = "Auto" };
if (Enum.READONLY === 0) {
    console.log("Ok");

}

function combine(input: number | string, as: "as-n"|"as-s"){//union and literal
    let result;
    if(typeof input === 'number')
        result = 5*input;
    else
        result = 5+input
    return result
}
console.log(combine(4,"as-n"));
console.log(combine("4",'as-n'));


type combine = number|string // alias  