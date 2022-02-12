const addBtn = document.querySelector(".add-btn")
const modalcont = document.querySelector(".modal-cont")
const maincont = document.querySelector(".main-cont")
const textArea = document.querySelector("textarea")
let addFlag=false;
addBtn.addEventListener('click',(e)=>{
    addFlag = !addFlag
    if(addFlag){
        modalcont.style.display="flex";
    }else{
        modalcont.style.display="none";
    }
})

const saveButton = document.querySelector(".save-btn")

saveButton.addEventListener('click', (e)=>{
    createNote()
    modalcont.style.display="none";
    addFlag=false;
    textArea.value=""
})
 
function createNote(){
    const noteCont = document.createElement("div")
    noteCont.setAttribute("class","note-cont")
    noteCont.innerHTML=`
    <div class="note-color"></div>
    <div class="note-id">id</div>
    <div class="note-area">text</div>
    `
    maincont.appendChild(noteCont)
    
}