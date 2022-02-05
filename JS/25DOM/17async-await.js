async function getPosts(){       // always return promise
    const res = await fetch(url) // await wait untill fetch is resolve
    if (!res.ok)
    throw new Error("something went wrong")
    return await res.json() 
}

getPosts().then((Data) => {
    console.log(Data);
  }).catch(err=>{ // catch is execute only if error is due to network
    console.log(err);
  })
