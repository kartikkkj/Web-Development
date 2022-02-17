const url= "https://www.youtube.com/playlist?list=PLmhe0g5IASVCzYWUcUYHgGQXSxAcsPX85"
const puppeteer = require("puppeteer");
const browserOpen = puppeteer.launch({ headless: false });
browserOpen
  .then((browserContext) => {
    return browserContext.pages();
  })
  .then((tabs) => {
    page = tabs[0];
    return tabs[0].goto("https://youtubemultidownloader.net/playlists.html");
  })
  .then(() => {
    return page.waitForSelector("input[type='text']", { visible: true });
  }).then(()=>{
    return page.type("input[type='text']",url)
}).then(()=>{
     page.waitForSelector('a[role="button"]',{visible:true})
    if(page.waitForSelector('button[name="btnLoadMore"]',{visible:true})){

    }
  })
  
  .catch((err) => {
    console.log(err);
  });
