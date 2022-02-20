const rows =1048
const cols =52

const addressColCont = document.querySelector(".address-col-cont")
const addressRowCont = document.querySelector(".address-row-cont")
const cellsCont = document.querySelector(".cells-cont")
const addressBar = document.querySelector(".address-bar")

for(let i = 1; i<=rows; i++){
    const addressCol = document.createElement("div")
    addressCol.innerText= i;
    addressCol.setAttribute("class", 'address-col')
    addressColCont.appendChild(addressCol)
}

for(let i = 1; i<=cols; i++){
    const addressRow = document.createElement("div")
    if(i<=26){
        addressRow.innerText= String.fromCharCode(64+i);
    }else{
        addressRow.innerText = "A" + String.fromCharCode(64+i-26);
    }
    addressRow.setAttribute("class", 'address-row')
    addressRowCont.appendChild(addressRow)
}

for(let i = 1; i <= rows; i++ ){
    const rowCont = document.createElement("div")
    rowCont.setAttribute("class","row-cont")
    for(let j = 1; j<=cols ; j++){
        const colCont = document.createElement('div')
        colCont.setAttribute("class","cell")
        colCont.setAttribute("contenteditable","true")
        rowCont.appendChild(colCont)
        addListenerForAddressBarDisplay(colCont,i,j)
    }
    cellsCont.appendChild(rowCont)
}

function addListenerForAddressBarDisplay(cell,i,j){
    cell.addEventListener("click",(e)=>{
        if(j<=26){
            addressBar.value=String.fromCharCode(64+j)+i
        }
        else{
            addressBar.value= "A" + String.fromCharCode(64+j-26)+i
        }
    })
}