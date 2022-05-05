const {exec} = require("child_process");
const  fs = require("fs");
const path = require('path')
const outputPath = path.join(__dirname, 'outputs');
if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath,{recursive :true})
}
const executeJava = async (filePath, input, className)=>{
    const jobId = path.basename(filePath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}`)
    return new Promise((resolve, reject)=>{ 
        exec(`javac ${filePath} -d ${outPath}  && cd ${outPath} && java -cp ${outPath} ${className}`, (error, stdout, stderr)=>{
            error && reject({error, stderr})
            stderr && reject(stderr)
            resolve(stdout) 
        })
    })
}

// javac C:\This_is_me\Programing\WEB_DEV\ReactJs\React_Practice\project\pair-programming\backend\codes\d1e9b254-801d-4e90-bbae-5b292ef4efee.java -d C:\This_is_me\Programing\WEB_DEV\ReactJs\React_Practice\project\pair-programming\backend\outputs\d1e9b254-801d-4e90-bbae-5b292ef4efee  && cd C:\This_is_me\Programing\WEB_DEV\ReactJs\React_Practice\project\pair-programming\backend\outputs\d1e9b254-801d-4e90-bbae-5b292ef4efee && java -cp C:\This_is_me\Programing\WEB_DEV\ReactJs\React_Practice\project\pair-programming\backend\outputs\d1e9b254-801d-4e90-bbae-5b292ef4efee HelloWorld
module.exports = { 
    executeJava 
}