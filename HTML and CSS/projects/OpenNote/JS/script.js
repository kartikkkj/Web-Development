const toggleCont= document.querySelector('.toggle-cont')
const pencil = document.querySelector(".pencil")

const eraser = document.querySelector(".eraser")
toggleCont.innerHTML=`<span class="material-icons md"> close </span>`
let toggleMenu = false;
toggleCont.addEventListener("click",(e)=>{
    const actions = document.querySelector(".actions")
    if(toggleMenu){
        toggleCont.innerHTML=`<span class="material-icons md"> close </span>`
        actions.style.animationName=""
        actions.style.animationName="showActions"
        actions.style.display = "flex"
        toggleMenu = false
    }else{
        toggleCont.innerHTML=`<span class="material-icons md"> menu </span>`
        actions.style.animationName=""
        setTimeout(()=>{
            setTimeout(()=>{
                actions.style.display = "none"
                toggleMenu = true
            },280)
            actions.style.animationName="hideActions"
            pencil.style.display ="none"
            eraser.style.display ="none" 
            eraserMenu = true
            pencilMenu = true
        },100)
        
        pencil.style.animationName="hidePencil"
        eraser.style.animationName="hideEraser"
        
    }
})

const actions = document.querySelectorAll("img")
let pencilMenu = true;
actions[0].addEventListener("click",(e)=>{
    
    if(pencilMenu){
        setTimeout(()=>{
            eraser.style.display ="none" 
            eraserMenu = true
        },100)
        eraser.style.animationName="hideEraser"
        pencil.style.animationName=""
        pencil.style.animationName="showPencil"
        pencil.style.display ="block"
        pencilMenu = false
    }
    else{
        setTimeout(()=>{
            pencil.style.display ="none" 
            pencilMenu = true
        },280)
        pencil.style.animationName=""
        pencil.style.animationName="hidePencil"
    }
})
let eraserMenu = true;
actions[1].addEventListener("click",(e)=>{
    const eraser = document.querySelector(".eraser")
    if(eraserMenu){
        setTimeout(()=>{
            pencil.style.display ="none" 
            pencilMenu = true
        },100)
        pencil.style.animationName= "hidePencil"
        eraser.style.animationName=""
        eraser.style.animationName="showEraser"
        eraser.style.display ="block"
        eraserMenu = false
    }
    else{
        setTimeout(()=>{
            eraser.style.display ="none" 
            eraserMenu = true
        },280)
        eraser.style.animationName=""
        eraser.style.animationName="hideEraser"
    }
})
const github = document.querySelector(".github")
github.addEventListener("click", (e)=>{
    const a = document.createElement("a")
    a.href="https://github.com/AbhyArya"
    a.target="blank"
    a.click();
})
// const minimize = document.querySelector(".minimize")
// let minimizeMenu = true;
// minimize.addEventListener("click",(e)=>{
//     const note = document.querySelector(".note")
//     const stickyNote = document.querySelector(".sticky-note")
//     if(minimizeMenu){
//         stickyNote.style.animationName="hideNote"
//         setTimeout(()=>{
//             stickyNote.style.height="2.5rem"
//             minimizeMenu = false;
//         },400)
//         note.style.display = "none"
//     }
//     else{
//         stickyNote.style.animationName="showNote"
//         setTimeout(()=>{
//             stickyNote.style.height="16rem"
//             note.style.display = "block"
//             minimizeMenu = true;
//         },400)
//     }
// })