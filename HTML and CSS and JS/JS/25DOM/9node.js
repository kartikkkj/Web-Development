const rootNode= document.getRootNode();
// console.log(rootNode);
// console.log(rootNode.childNodes)
// function printNodes(rootNode){
//     if(rootNode.childNodes.length==0){
//         return
//     }
//     for(let i=0; i<rootNode.childNodes.length; i++){
//         let elementRoot=rootNode.childNodes[i]
//         console.log(rootNode.childNodes[i])
       
//         printNodes(elementRoot)
//     }
// }
// printNodes(rootNode)

const htmlNode= rootNode.childNodes[1];
// console.log(htmlNode.parentNode);
console.log(htmlNode.childNodes)
const headNode= htmlNode.childNodes[0]

// nextSibling
// nextElementSibling  