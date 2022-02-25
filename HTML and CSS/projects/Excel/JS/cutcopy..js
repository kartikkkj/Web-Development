const copybtn = document.querySelector(".copy")
const pastebtn = document.querySelector(".paste")
const cutbtn = document.querySelector(".cut")

let shiftKey ;
document.addEventListener("keydown",(e)=>{
    shiftKey = e.shiftKey
})
document.addEventListener("keyup",(e)=>{
    shiftKey = e.shiftKey
    if(rangeStorage.length!==2)
         rangeStorage = []
})

let rangeStorage = []

function handleSelectedCells(cell){
    if(!shiftKey){
        return
    }
    if(rangeStorage.length >= 2){
        SelectCellborder(0,"")
       rangeStorage= []
    }
    const rid = Number(cell.getAttribute("rid"))
    const cid = Number(cell.getAttribute("cid"))
    rangeStorage.push([rid,cid])
    if(rangeStorage.length == 2){
        SelectCellborder(3,cellBorderColor)
    }
}

function SelectCellborder(size,color){
    for(let i = rangeStorage[0][0]; i<= rangeStorage[1][0] ; i++){
        for(let j = rangeStorage[0][1] ; j<= rangeStorage[1][1]; j++){
            const rangeCell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            if(i===rangeStorage[0][0] && j===rangeStorage[0][1]){
                rangeCell.style.borderLeft = `${size}px solid ${color}`
                rangeCell.style.borderTop = `${size}px solid ${color}`
            }
            else if(i===rangeStorage[0][0]){
                rangeCell.style.borderTop = `${size}px solid ${color}`
            }
            if(i === rangeStorage[1][0] && j === rangeStorage[0][1]){
                rangeCell.style.borderLeft = `${size}px solid ${color}`
                rangeCell.style.borderBottom = `${size}px solid ${color}`
            }
           else if(j === rangeStorage[0][1]){
             rangeCell.style.borderLeft = `${size}px solid ${color}`
           }
            if(i===rangeStorage[0][0] && j===rangeStorage[1][1]){
                rangeCell.style.borderRight = `${size}px solid ${color}`
                rangeCell.style.borderTop = `${size}px solid ${color}`
            }
            else if(j===rangeStorage[1][1]){
                rangeCell.style.borderRight = `${size}px solid ${color}`
            }
            if(i === rangeStorage[1][0] && j === rangeStorage[1][1]){
                rangeCell.style.borderRight = `${size}px solid ${color}`
                rangeCell.style.borderBottom = `${size}px solid ${color}`
            }else if (i === rangeStorage[1][0]){
                rangeCell.style.borderBottom = `${size}px solid ${color}`
            }
            
        }
    }
}

let copyData = []
copybtn.addEventListener("click", (e)=>{
    if(rangeStorage.length<2){
        return
    }
    copyData =[]
    for(let i = rangeStorage[0][0]; i<= rangeStorage[1][0] ; i++){
        const row =[]
        for(let j = rangeStorage[0][1] ; j<= rangeStorage[1][1]; j++){
            row.push(sheetDB[i][j])
        }
        copyData.push(row)
    }
    SelectCellborder(0,"")
})

// cutbtn.addEventListener("clilck")
pastebtn.addEventListener("click",(e)=>{
    if(copyData.length===0){
        return
    }
    const address = addressBar.value
    const [rid, cid] = decodeRIDCIDfromAddress(address);
    for(let i = rid,l = 0; i <= rid+Math.abs(rangeStorage[1][0]-rangeStorage[0][0]) ;l++, i++){
         
        for(let j = cid,k=0 ; j <= cid+Math.abs(rangeStorage[1][1]-rangeStorage[0][1]); j++ ,k++){
            const rangeCell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            if(rangeCell){
                sheetDB[i][j] = copyData[k][l]
                rangeCell.click() 
            }
        }
    }
})

cutbtn.addEventListener('click',(e)=>{
    if(rangeStorage.length<2){
        return; 
    }
    copyData =[]
    for(let i = rangeStorage[0][0]; i<= rangeStorage[1][0] ; i++){
        const row =[]
        for(let j = rangeStorage[0][1] ; j<= rangeStorage[1][1]; j++){
            const rangeCell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            row.push(sheetDB[i][j])
            sheetDB[i][j] = returnDefauldata();
            rangeCell.click()
        }
        copyData.push(row)
    }
    SelectCellborder(0,"")
})







const downloadbtn = document.querySelector(".download")
const uploadbtn = document.querySelector(".upload") 

downloadbtn.addEventListener("click",(e)=>{
    const data = JSON.stringify([sheetDB,graphComponentMatrix])
    const file = new Blob([data],{type:"application/json"})
    const a = document.createElement("a")
    a.href = URL.createObjectURL(file)
    a.download = "sheetDATA.json"
    a.click()
})
uploadbtn.addEventListener("click",(e)=>{
    const input = document.createElement("input")
    input.setAttribute("type", 'file')
    input.click()
    input.addEventListener("change", (e)=>{
        const fr = new FileReader()
        const files = input.files;
        const fileObj = files[0]
        fr.readAsText(fileObj)
        fr.addEventListener("load", (e)=>{
            const readSheetData = JSON.parse(fr.result)
            addSheetBtn.click()
            sheetDB = readSheetData[0]
            graphComponentMatrix = readSheetData[0]
            collectedSheetDB[collectedSheetDB.length - 1] = sheetDB
            collecteddGraphComponent[collecteddGraphComponent.length -1 ] = graphComponentMatrix
            handleSheetProp(); 
        })
    })
    
})