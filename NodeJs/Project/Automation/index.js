const puppeteer = require("puppeteer");
let page;
puppeteer
  .launch({ headless: false })
  .then((BrowerContext) => {
    return BrowerContext.pages(); // return array of tabs
  })
  .then((tabs) => {
    page = tabs[0]
    return tabs[0].goto("http://www.google.com");
  }).then(()=>{
     return  page.waitForSelector("input[type='text']",{visible:true})
  })
  .then(()=>{
      console.log('type')
      return page.type("input[type='text']","facebook")
  }).then((tab)=>{
      return page.keyboard.press("Enter")
  }).then(()=>{
    return  page.waitForSelector("h3.LC20lb.MBeuO.DKV0Md",{visible:true})
  }).then(()=>{
    return page.click("h3.LC20lb.MBeuO.DKV0Md")
  }).catch((err)=>{
      console.log(err)
  })
