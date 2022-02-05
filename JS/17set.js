const number= new Set([13,5]); // no duplicate allowed
for (let i = 0; i < 10; i++) {
    number.add(i);
}
number.add([4,6])//----| 
number.add([4,6])//----| these two are different and store both the array

list=[1,2,4,5]
number.add(list)//----|
number.add(list)//----| //here list array is same so add only ones 
console.log(number)



// iterable -->string,Array,set (forOf Loop)
// no index based access
// Order is not guaranteed
// unique item

//array like object-->(length method and access using [])

