const url = "https://jsonplaceholder.typicode.com/posts";


//get method
fetch(url)
  .then((res) => {
    if(res.ok)
    return res.json();
    else
    throw new Error("something went wrong")
  })
  .then((Data) => {
    console.log(Data);
  }).catch(err=>{ // catch is execute only if error is due to network
    console.log(err);
  })




//post method
  fetch(url,{
    method:"post",
    body:JSON.stringify({
      title:'foo',
      body:"bar",
      userId:1,
    }),
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  }).then((res) => {
    if(res.ok)
    return res.json();
    else
    throw new Error("something went wrong")
  })
  .then((Data) => {
    console.log(Data);
  }).catch(err=>{ // catch is execute only if error is due to network
    console.log(err);
  })