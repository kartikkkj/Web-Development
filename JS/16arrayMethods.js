//All these methods take a callback as parameter


//FOR EACH
const numbers= [5,3,6,2];
function myfun( number,index){
    console.log(`index ${index} === ${number*2}`)
}
numbers.forEach(myfun)  // pass value and index
// OR
numbers.forEach((number,index)=>console.log(`index ${index} === ${number*2}`))


// MAP
const newArray= numbers.map((number)=> number*number)// it always make a new array and return it

console.log(newArray)



//FILTER
const newArr= numbers.filter((number)=> number%2!==1) // their is always ruturn boolean
console.log(newArr)


//REDUCE
const ans=numbers.reduce((pre,curItem)=> pre+curItem)
console.log(ans);
 


//SORT
let ArrayToSort=[5,10,12,1000,53]
ArrayToSort.sort((a,b)=>a-b)//b-a for disccendig order
console.log(ArrayToSort)


//FIND
const array2=["hello", "cat", "dog"]
const ans1=array2.find(string=>string.length===3)// always return first element that satisfy the condition
console.log(ans1);


//EVERY
const AllEven= numbers.every(number=>number%2===0)// always return boolean if every element satisfy the condition in array
console.log(AllEven)



// SOME
const anyEven= numbers.some(number=>number%2===0)// always return boolean if every element satisfy the condition in array
console.log(anyEven)


//FILL
const value=9
const start=0
const end=numbers.length-1
numbers.fill(value,start,end);
console.log(numbers)

//SPLICE
const start1=1
const count=1
const ToInsertItem= "hello"
console.log(array2)
array2.splice(start1,count, ToInsertItem); // delete from start and no of count and also return array of that element
console.log(array2)