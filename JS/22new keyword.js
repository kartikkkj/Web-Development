//  1.new create {} and add key-value pair in that Object
//  2.connect prototype as __proto__ 
//  3.return that {}

function CreateUser(firstname, lastname, age){// this is also known as constructor function
    this.firstName= firstname
    this.lastname=lastname
    this.age= age
}
CreateUser.prototype.about=function(){console.log(this.firstName, this.lastname, this.age)}
const user1=new CreateUser("Abhishek", "Kumar", 43)
console.log(user1)