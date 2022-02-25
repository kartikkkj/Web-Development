const url= "https://www.hackerrank.com/auth/login"

const e = require("express");
const puppeteer = require("puppeteer");
const email = "abhiarya329@gmail.com"
const pass = "+-aGQ@7_+TSguYm"
const browserOpen = puppeteer.launch({ 
  headless: false,
  args:[
    '--start-maximized' // you can also use '--start-fullscreen'
 ],
defaultViewport:null
});

let page;

browserOpen
  .then((browserContext) => {
    return browserContext.newPage();
  }).then((newTab)=>{
    page = newTab;
    return newTab.goto(url);
  }).then(()=>{
    return page.waitForSelector("input[id='input-1']",{visible:true})
  })
  .then(()=>{
    return page.type("input[id='input-1']",email,{delay:50})
  }).then(()=>{
    return page.type("input[id='input-2']",pass,{delay:50})
  }).then(()=>{
    return page.click("button[type='submit']");
  }).then(()=>{
   return waitAndClick("div[data-automation='algorithms']")
  }).then(()=>{
   return waitAndClick("input[value='warmup']")
  }).then(()=>{
    return page.waitFor(300)
  }).then(()=>{
    return page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",{delay:50})
  }).then((questions)=>{
      questionsSolver(questions[0], answer[0])
  })
  
  
  
  
  
  .catch((err)=>{
    console.log(err);
  })

  function questionsSolver(question , ans){
    return new Promise((res,rej)=>{
        question.click().then(()=>{
          return waitAndClick(".hr-monaco-base-editor.showUnused")
        }).then(()=>{
          return waitAndClick(".checkbox-input")
        }).then(()=>{
          return page.waitForSelector('textarea.custominput')
        }).then(()=>{
          return  page.type('textarea.custominput',ans,{delay:50})
        }).then(()=>{
          return page.keyboard.down("Control")
        }).then(()=>{
          return page.keyboard.press("A",{delay:50})
        }).then(()=>{
          return page.keyboard.press("X",{delay:50})
        }).then(()=>{
          return page.keyboard.up("Control",{delay:50})
        })
        .then(()=>{
          return waitAndClick(".hr-monaco-base-editor.showUnused",{delay:50})
        })
        .then(()=>{
          return page.keyboard.down("Control",{delay:50})
        }).then(()=>{
          return page.keyboard.press("A",{delay:50})
        }).then(()=>{
          return page.keyboard.press("V",{delay:50})
        })
        .then(()=>{
          return page.keyboard.up("Control",{delay:50})
        }).then(()=>{
          return page.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled",{delay:50})
        })
        .then(()=>{
          resolve()
        }).catch(()=>{
          reject()
        })
    })
  }

  function waitAndClick(selector){
    return new Promise((resolve, reject)=>{
      page.waitForSelector(selector,{visible:true}).then(()=>{
        return page.click(selector)
      }).then(()=>{
        resolve();
      })
      .catch(()=>{
        reject()
      })
      
    })
  }


answer=  [`#include <bits/stdc++.h>
  using namespace std;
  
  int main(){
      int number_of_elements;
      cin >> number_of_elements;
      vector <int> array(number_of_elements);
      int sum_of_array = 0;
      
      for(int i = 0; i < number_of_elements; i++){
         cin >> array[i];
         sum_of_array += array[i];
      }
      
      cout << sum_of_array;
      return 0;
  }`

]