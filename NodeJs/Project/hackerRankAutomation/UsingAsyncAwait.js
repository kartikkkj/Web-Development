const url = "https://www.hackerrank.com/auth/login";

const e = require("express");
const puppeteer = require("puppeteer");
const email = "abhiarya329@gmail.com";
const pass = "+-aGQ@7_+TSguYm";
let page;
(async function () {
  try {
    const browserOpen = await puppeteer.launch({
      headless: false,
      args: [
        "--start-maximized", // you can also use '--start-fullscreen'
      ],
      defaultViewport: null,
    });
    const newTab = await browserOpen.newPage();
    page = newTab;
    await page.goto(url);
    await page.type("input[id='input-1']", email, { delay: 50 });
    await page.type("input[id='input-2']", pass, { delay: 50 });
    await page.click("button[type='submit']");
    await waitAndClick("div[data-automation='algorithms']")
    await waitAndClick("input[value='warmup']");
    await page.waitFor(300);
    const arr = await page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",{ delay: 50 });
    for(let i =0; i<arr.length; i++){
        await questionsSolver(arr[0], answer[0]);
    }
  } catch (error) {
      console.log(error)
  }
})();

async function questionsSolver(question, ans) {
  await question.click();
  await waitAndClick(".hr-monaco-base-editor.showUnused");
  await waitAndClick(".checkbox-input");
  await page.waitForSelector("textarea.custominput");
  await page.type("textarea.custominput", ans, { delay: 50 });
  await page.keyboard.down("Control");
  await page.keyboard.press("A", { delay: 50 });
  await page.keyboard.press("X", { delay: 50 });
  await page.keyboard.up("Control", { delay: 50 });
  await waitAndClick(".hr-monaco-base-editor.showUnused", { delay: 50 });
  await page.keyboard.down("Control", { delay: 50 });
  await page.keyboard.press("A", { delay: 50 });
  await page.keyboard.press("V", { delay: 50 });
  await page.keyboard.up("Control", { delay: 50 });
  await page.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled",{ delay: 50 });
}

async function waitAndClick(selector) {
  await page.waitForSelector(selector, { visible: true });
  return await page.click(selector);
}

answer = [
  `#include <bits/stdc++.h>
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
  }`,
];
