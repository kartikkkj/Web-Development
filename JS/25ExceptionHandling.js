let x=5
try {
    console.log(x/0);
    if(x == "") throw "is empty";
    // throw new Error("error  Message")
  }
  catch(err) {
    console.log(err)
  }
  finally {
    console.log("finally")
  }