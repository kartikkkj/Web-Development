const path = require('path')

let file = path.basename('test.json');

let file1= path.dirname('NodeJs/test.json')

let file2= path.isAbsolute('C:/This is me/Programing/WEB DEV/NodeJs')// return true if path is absolute else false.

let file3= path.join(__dirname,file)//join the paths

let file4= path.parse(file3)
console.log(file4);
