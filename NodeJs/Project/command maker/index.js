#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
let inputArr = process.argv.slice(2);
console.log(inputArr);

const fileType = {
  media: ["mp4", "mkv"],
  archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
  document: ["docx", "doc", "pdf", "xlsx", "odt", "odt", "ods", "odp", "txt"],
  app: ["exe", "pkg"],
};

let command = inputArr[0];
switch (command) {
  case "tree":
    treeFn(inputArr[1]);
    break;
  case "organize":
    organizeFn(inputArr[1]);
    break;
  case "help":
    helpFn();
    break;
  default:
    console.log("Please 🙏 input right abhishek command");
    break;
}

function treeFn(dirPath) {
    if (dirPath == undefined) {
        
        treeFnHelper(process.cwd(),"")
        return;
      } else {
        if (fs.existsSync(dirPath)) {
          treeFnHelper(dirPath)
          
        } else {
          console.log("Please provide valid <directory_path>");
        }
      }
}

function treeFnHelper(dirPath,indend){
    let isFile= fs.lstatSync(dirPath).isFile()
    if (isFile) {
        console.log(indend+"|--- "+ path.basename(dirPath))
    }
    else{
        const dirName = path.basename(dirPath)
        console.log(indend+"'--- "+ path.basename(dirPath))
        let files = fs.readdirSync(dirPath)
            for(let i =0; i<=files.length; i++){
                let child=path.join(dirPath,files[i])
                treeFnHelper(child, indend+"")    
            }
        
    }
}

function organizeFn(dirPath) {
  let destPath;
  if (dirPath == undefined) {
    destPath=process.cwd()
    return;
  } else {
    if (fs.existsSync(dirPath)) {
      destPath = path.join(dirPath, "organized");
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath);
      }
    } else {
      console.log("Please provide valid <directory_path>");
    }
  }
  organizeFnHelper(dirPath, destPath);
}

function organizeFnHelper(dirPath, destPath) {
  const files = fs.readdirSync(dirPath);
  for (let i = 0; i < files.length; i++) {
    const file = path.join(dirPath, files[i]);
    let isFile= fs.lstatSync(file).isFile()
    if (isFile) {
      const cat = getcat(files[i]);
      sendfiles(file, destPath, cat);
      console.log(files[i]);
    }
  }
}

function sendfiles(src, destPath, cat) {
  let catepath = path.join(destPath, cat);
  if (!fs.existsSync(catepath)) {
    fs.mkdirSync(catepath);
  }
  const currfilePath = path.basename(src);
  const destFilePath = path.join(catepath, currfilePath);
  fs.copyFileSync(src, destFilePath);
  fs.unlinkSync(src);
}

function getcat(fileName) {
  let ext = path.extname(fileName);
  ext = ext.slice(1);
  for (let type in fileType) {
    for (let extention of fileType[type]) {
      if (ext == extention) {
        return type;
      }
    }
  }
  return "others";
}

function helpFn() {
  console.log(`
        List of all abhishek command:
        node main.js tree <directory_path>
        node main.js organize <directory_path>
        node main.js help
    `);
}
