class CreateUser{
    
    constructor(firstname, lastname, age){
        this.firstName= firstname
        this.lastname=lastname
        this.age= age
    }
    is18(){
        return this.age>=18
    }
    about(){
        console.log(this.firstname, this.secondname, this.age)
    }
    static des="this is users class"
    static desfun(){
        console.log(`hello`)
    }
}

const user1= new CreateUser("Abhishek", "kumar", 65)
const user2= new CreateUser("krishna", "mukhiya", 65)
console.log(user1)
console.log(user2)
console.log(CreateUser.des)
CreateUser.desfun()