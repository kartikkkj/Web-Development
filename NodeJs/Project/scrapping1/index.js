const axios = require("axios");
const cheerio = require("cheerio");
const xlsx = require("xlsx");

const url = "https://www.espncricinfo.com/series/ipl-2012-13-1210595";
let count =0;
function fetch1(url) {
  axios
    .get(url)
    .then((res) => {
      if(count==0)
      extractLink(res.data);
      else if(count==1){
        extractAllLink(res.data);
      }else{
        extractData(res.data);
      }
      count++;
    })
    .catch((err) => {
      console.log(err);
    });
}

fetch1(url);


function extractLink(html) {
  const $ = cheerio.load(html);
  let anchorElement = $('a[data-hover="View All Results"]');
  let link = anchorElement.attr("href");
  const fullLink = "https://www.espncricinfo.com" + link;
 fetch1(fullLink)
  
}


function extractAllLink(html) {
  const $ = cheerio.load(html);
  let anchorElement = $('a[data-hover="Scorecard"]');
  for (let i = 0; i < anchorElement.length; i++) {
    const link = $(anchorElement[i]).attr("href");
    const fullLink = "https://www.espncricinfo.com" + link;
    fetch1(fullLink)
   
  }
}

function extractData(html) {
  const $ = cheerio.load(html);
  const descEle = $(".match-header-container .description");
  const result = $(".match-header-container .status-text");
  const vanue = descEle.text().split(",")[1].trim();
  const date = descEle.text().split(",")[2].trim();
  const inning = $(".match-scorecard-page .Collapsible");
  const arr = [];
  for (let i = 0; i < inning.length; i++) {
    const teamName = $(inning[i]).find("h5").text().split("INNINGS")[0].trim();
    const opponentIndex = i == 0 ? 1 : 0;
    const opponentName = $(inning[opponentIndex])
      .find("h5")
      .text()
      .split("INNINGS")[0]
      .trim();

    const allRows = $(inning[i]).find(".table.batsman tbody tr");
    
    for (let j = 0; j < allRows.length; j++) {
      const allCols = $(allRows[j]).find("td");
      if ($(allCols[0]).hasClass("batsman-cell")) {
        const PlayerName = $(allCols[0]).text().trim();
        const run = $(allCols[2]).text().trim();
        const balls = $(allCols[3]).text().trim();
        const four = $(allCols[5]).text().trim();
        const sixes = $(allCols[6]).text().trim();
        const sr = $(allCols[7]).text().trim();
        
        const tempArr = []
        tempArr["Player Name"] =PlayerName;
        tempArr["Run"] =run
        tempArr["Balls"]=balls
        tempArr['Fours']=four
        tempArr["Sixes"]==sixes
        tempArr["Strike Rate"]=sr
        arr.push(tempArr);
      }
    }

    
  }
  console.table(arr);
}








function excelWriter(filePath , json, sheetName){
  const NewWB = xlsx.utils.book_new()
  const newWS = xlsx.utils.json_to_sheet(json)
  xlsx.utils.book_append_sheet(newWB,newWS,sheetName)
  xlsx.writeFile(newWB,filePath)
}

function ex