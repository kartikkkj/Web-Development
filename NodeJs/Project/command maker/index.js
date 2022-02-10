#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
let inputArr = process.argv.slice(2);

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
    helpFnHelper()
    break;
}

function treeFn(dirPath) {
  if (dirPath == undefined) {
    dirPath = process.cwd();
  } 
  treeFnHelper(dirPath, "");
}

function treeFnHelper(dirPath, indend) {
  let isFile = fs.lstatSync(dirPath).isFile();
  if (isFile) {
    const dirName = path.basename(dirPath);
    console.log(indend + "|--- " + dirName);
  } 
  else {
    const dirName = path.basename(dirPath);
    console.log(indend + "'--- " + dirName);
    if(toString(dirPath).conta){
      return;
    }
    let files = fs.readdirSync(dirPath);
    for (let i = 0; i < files.length; i++) {
      let child = path.join(dirPath, files[i]);
      treeFnHelper(child, indend + "\t");
    }
  }
}

function organizeFn(dirPath) {
  let destPath;
  if (dirPath == undefined) {
    dirPath = process.cwd();
    destPath = path.join(dirPath, "organized");
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath);
    }
  } else {
    if (fs.existsSync(dirPath)) {
      destPath = path.join(dirPath, "organized");
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath);
      }
    }
  }

  organizeFnHelper(dirPath, destPath);
}

function organizeFnHelper(dirPath, destPath) {
  const files = fs.readdirSync(dirPath);
  for (let i = 0; i < files.length; i++) {
    const file = path.join(dirPath, files[i]);
    let isFile = fs.lstatSync(file).isFile();
    if (isFile) {
      const cat = getcat(files[i]);
      sendfiles(file, destPath, cat);
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
  helpFnHelper()
}

function helpFnHelper(){
  console.log(`
  List of all abhishek command:
        abhishek tree <directory_path>
        abhishek organize <directory_path>
        abhishek help
    `);
}