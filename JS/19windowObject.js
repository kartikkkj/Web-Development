//call function
const user1={
    firstName:"Abhishek",
    age:12,
    about:function(hobbie){
        console.log(this.firstName,this.age,hobbie)
    }
}

const user2={
    firstName:"Arya",
    age:53
}

user1.about.call(user2,"music") // it call user1's about function and this will consider of user2 and also pass parameter of that function



//Apply
user1.about.apply(user2,["music"]) // it call user1's about function and this will consider of user2 and always pass parameter in array



//Bind
const func=user1.about.bind(user2,"music") // it call user1's about function and this will consider of user2 and always pass parameter  and always return a function 
func()



// if about function is in globle scope use as
//about.call(user1) // ans so on