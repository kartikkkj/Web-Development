// "use strict"
function myfunc() {
  const inner = () => console.log("hello world");
  return inner;
}
const returned = myfunc;
returned();
//this is also known as higher order function

//    *CLOSURE* Very Important
// when a function return a function then it reture with all local variable of his own laxical scope

const pow = (power) => (number) => number ** power;

const findSquare = pow(2);
const ans = findSquare(4);
console.log(ans);

const findCube = pow(3);
const ans1 = findCube(4);
console.log(ans1);

// real life Example of  closure

function func() {
  let conter = 0;
  return function () {
    if (conter < 1) {
      console.log("one");
      conter++;
    } else {
      console.log("khatam");
    }
  };
}
const thiscaller = func();
thiscaller();
thiscaller();
thiscaller();



