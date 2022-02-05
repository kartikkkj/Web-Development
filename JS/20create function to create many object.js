function CreateUser(firstname,lastname, age){
    const user={}
    user.firstname=firstname
    user.secondname=lastname
    user.age= age;
    user.is18=function(){
        return this.age>=18
    }
    user.about=function(){
        console.log(this.firstname, this.secondname, this.age)
    }
    // both function create for all users that is not efficient and takes more memory
    return user
}
const user1= CreateUser("Abhishek", "Arya", 20)
const user2= CreateUser("krishna", "Mukhiya", 23)
console.log(user1.is18())
user1.about()


// more efficient way
const userMethod={
    is18:function(){
        return this.age>=18
    },
    about:function(){
        console.log(this.firstname, this.secondname, this.age)
    }
}
function CreateUser1(firstname,lastname, age){
    const user={}
    user.firstname=firstname
    user.secondname=lastname
    user.age= age;
    user.is18=userMethod.is18
    user.about=userMethod.about
    // both function uses the reference of the function in userMethod Object 
    return user
}
const user3= CreateUser1("Abhishek", "Arya", 20)
const user4= CreateUser1("krishna", "Mukhiya", 23)
console.log(user4.is18())
user4.about()



//More efficient using __proto__ / [[prototype]]

const userMethod2={
    is18:function(){
        return this.age>=18
    },
    about:function(){
        console.log(this.firstname, this.secondname, this.age)
    }
}

function CreateUser2(firstname,lastname, age){
    const user=Object.create(userMethod)// it return empty object with __proto__  of userMethod
    // if any key is not present in user then check in userMethod
    user.firstname=firstname
    user.secondname=lastname
    user.age= age;
    return user
}

const user5= CreateUser2("Abhishek", "Arya", 20)
const user6= CreateUser2("krishna", "Mukhiya", 23)
console.log(user5.is18())
user5.about()
console.log(user5)



console.log("SEE AFTER THIS")
// inhancing using protoType

function CreateUser3(firstname,lastname, age){
    const user=Object.create(CreateUser3.prototype)
    user.firstname=firstname
    user.secondname=lastname
    user.age= age;
    return user
}
CreateUser3.prototype.about=function(){ return console.log(this.firstname, this.secondname, this.age)}
CreateUser3.prototype.is18=function(){ return this.age>=18}

const user7= CreateUser3("Abhishek", "Arya", 20)
const user8= CreateUser3("krishna", "Mukhiya", 23)
console.log(user7)
console.log(user7.is18())
console.log(user8)
user8.about()

  