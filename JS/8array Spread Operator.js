let arr= [13, "hello", [53,true,44.3]]
console.log(arr[2])
console.log(Array.isArray(arr))

arr[2]="hello"
console.log(arr)

arr.push(54)//push in last
console.log(arr)

arr.pop()//pop from last
console.log(arr);
let arr_last = arr.pop();
console.log(arr_last)
console.log(arr)
arr.

arr.unshift("banana")//push in starting
console.log(arr)
arr.shift()
console.log(arr)
let shift_first=arr.shift()
console.log(arr)
console.log(shift_first)


// making array with different reference

let array1=[23, 52, 62]
let array2=array1.slice(0)
//OR
let array3=[].concat(array1);
//OR using spread operator
let array4=[...array1, ...arr]


//Sort method
let ArrayToSort=[5,10,12,1000,53]
console.log(ArrayToSort.sort()) //sort function always convert the array value in string then sort that string using their ASCII value of first character.

ArrayToSort.sort((a,b)=>a-b)
console.log(ArrayToSort)

