class Animal{
    constructor(name, age){
        this.name=name
        this.age= age
    }
    isCute(){
        return this.age<=2
    }
    name1(){
        return this.name
    }

    get age1(){//getter
        return this.age
    }
    setage(age){// setter
         this.age=age;
     }
    set name2(some){// setter
        this.name=some;
    }     

}
class Dog extends Animal{
    constructor(name,age){
        super(name,age)
    }
}

const dog1= new Dog("moti",4)
console.log(dog1.isCute())
console.log(dog1.name1())
console.log(dog1.age1)//getter call
dog1.name2="tommy"// setter call 
console.log(dog1)