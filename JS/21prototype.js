function myfunc(){
    console.log("this is me brother")
}
//javaScript provide many usefull properties such as
const fname=myfunc.name
console.log(fname)

// you can also make your custon properties such as
myfunc.ownProperties="mai mai hu"
console.log(myfunc.ownProperties)


//only function provide prototype properties
// prototype give {} 
console.log(myfunc.prototype);

myfunc.prototype.prototypeName="hello"
myfunc.prototype.prototypeName2="hii"
myfunc.prototype.prototypeName3=()=> console.log("kese ho bete")

console.log(myfunc.prototype);

myfunc.prototype.prototypeName3()