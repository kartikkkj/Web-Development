// arr=[22, 63,,643,45]
// console.log(typeof arr)
// console.log(arr)

// const obj={
//     name:"Abhishek"
// }
// console.log(obj)
// // __proto__

class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    // Animal.numberOfAnimal+=1
  }

  isCute() {
    return this.age < 5;
  }

  get getName() {
    return this.name;
  }
  set setName(name1) {
    return (this.name = name1);
  }

  // static  numberOfAnimal = 0
}

// let moti1 =new  Animal("moti", 2)
// console.log(moti1.getName)// properties

// moti1.setName="tommy"

// console.log(moti1.getName)// properties

// // inheritance
// // [[prototype]] or __proto__
// // prototype
// class Dog extends Animal{

//     constructor(name,age)
//     {
//         super(name, age)
//         this.name1= name
//         this.age1= age
//     }
//     isItAnimal(){
//         return true;
//     }

// }

// let moti2 =new  Dog("moti", 2)
// let moti3 =new  Dog("moti", 2)
// let moti4 =new  Dog("moti", 2)

// console.log(Animal.numberOfAnimal)
// console.log(moti1)

// // let dog =new Animal("moti", 2);
// // let dog1 =new Animal("tommy", 5);
// // console.log(dog.isCute())
// // console.log(dog1.isCute())

// callBack

// function power(number, power){
//     return number**power(6)
// }
// function heelo(num){
//     return num;''
// }

// console.log(power(2,heelo))

// closure
console.log(
  (function (num, pow) {
    return (
      num **
      (function (pow) {
        return pow;
      })(pow)
    );
  })(2, 4)
);

// let obj={
//     0:1,
//     1:2,
//     2:3,
//     3:4
// }
// obj.type=5;
// console.log(obj)

// arr= [1,2,3,4]
// console.log(arr)

// arr.type= "Abhi"

// arr[54]= 43;

// console.log(arr)

function a() {
  console.log("hello");
}

// console.log(window)

// console.log(this)
// alert()

function print(n) {
  if (n === 0) return;
  print(n - 1);
  console.log(n);
}

print(5);
