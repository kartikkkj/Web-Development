const btn = document.querySelector("button")
btn.onclick=(e)=>{
    console.log("hello");
    if(document.body.classList.contains("dark-mode")){
        document.body.classList.remove("dark-mode")
        btn.innerText = "Dark Mode"
    }
    else{
        document.body.classList.add("dark-mode");
        btn.innerText = "Light Mode"
    }
}
