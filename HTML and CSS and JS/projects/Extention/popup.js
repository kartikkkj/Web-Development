const btn = document.querySelector(".pick-color");
const value = document.querySelector(".color-value");
const grid = document.querySelector(".color-grid");

async function pickColor(){
    try {
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open();
    } catch (error) {
        console.log(error);
    }
}
btn.onclick = async(e)=>{
    const [tab] = await chrome.tabs.query({active:true, currentWindow:true})
    chrome.scripting.executeScript({
        target:{tabId : tab.id},
        function:pickColor,
    }, async(injectionResult)=>{
        const [data] =injectionResult;
        if(data.result){
            const color = data.result.sRGBHex;
            grid.style.backgroundColor = color;
            value.innerText = color;
            try {
                await navigator.clipboard.writeText(color)
            } catch (error) {
                console.log(error);
            }
        }
    })
}