let arr= [34, 32 ,62, 734 ,75,57, 3,7]

//for Of loop
for(const value of arr) {
    console.log(value);
}

//for in loop
for (const index in arr) {
    console.log(arr[index])
}

arr.forEach(element => {
    console.log(element)
});