// all required modules
const axios = require("axios");
const cheerio = require("cheerio");
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

//URL
const year = "2012-13";
const url = `https://www.espncricinfo.com/series/ipl-${year}-1210595`;

//function call
fetch1(url)
  .then((res) => {
    extractLink(res);
  })
  .catch((err) => {
    console.log(err);
  });



//fetch data
function fetch1(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}



//to view all result
function extractLink(html) {
  const MainDir = path.join(__dirname, `IPL-${year}`);
  dirCreater(MainDir);
  const $ = cheerio.load(html);
  let anchorElement = $('a[data-hover="View All Results"]');
  let link = anchorElement.attr("href");
  const fullLink = "https://www.espncricinfo.com" + link;
  fetch1(fullLink)
    .then((res) => {
      extractAllLink(res);
      console.log("1")
    })
    .catch((err) => {
      console.log(err);
    });

    
}


// to check scoreCard
function extractAllLink(html) {
  const $ = cheerio.load(html);
  let anchorElement = $('a[data-hover="Scorecard"]');
  for (let i = 0; i < anchorElement.length; i++) {
    const link = $(anchorElement[i]).attr("href");
    const fullLink = "https://www.espncricinfo.com" + link;
    fetch1(fullLink)
      .then((res) => {
        extractData(res);
        console.log("2")
      })
      .catch((err) => {
        console.log(err);
      });
  }

}


//data from scoreCard
function extractData(html) {
  const $ = cheerio.load(html);
  const descEle = $(".match-header-container .description");
  const result = $(".match-header-container .status-text");
  const vanue = descEle.text().split(",")[1].trim();
  const date = descEle.text().split(",")[2].trim();
  const inning = $(".match-scorecard-page .Collapsible");
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

        processPlayer(
          teamName,
          PlayerName,
          run,
          balls,
          four,
          sixes,
          sr,
          opponentName,
          vanue,
          date,
          result
        );
      }
    }
  }
}


// file working function
function processPlayer(
  teamName,
  PlayerName,
  run,
  balls,
  four,
  sixes,
  sr,
  opponentName,
  vanue,
  date,
  result
) {
  const teamPath = path.join(__dirname, `IPL-${year}`, teamName);
  dirCreater(teamPath)
  const filePath = path.join(teamPath, `${PlayerName}.xlsx`);
  const content = excelReader(filePath, PlayerName);
  let PlayerObj = {
    "TEAM" : teamName,
    "Player Name" : PlayerName,
    "Run":run,
    "Balls":balls,
    "Fours":four,
    "Sixes":sixes,
    "Strike Rate": sr,
    "Opponent Name":opponentName,
    "Venue":vanue,
    "Date":date,
    "Result":result,
  };
  content.push(PlayerObj)
  excelWriter(filePath, content);
}




//utility functions
function excelWriter(filePath, json) {
  const newWB = xlsx.utils.book_new();
  const newWS = xlsx.utils.json_to_sheet(json);
  xlsx.utils.book_append_sheet(newWB, newWS, "All_Scores");
  xlsx.writeFile(newWB, filePath);
}

function excelReader(filePath, sheetName) {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const wb = xlsx.readFile(filePath);
  const excelData = wb.Sheets(sheetName);
  const ans = xlsx.utils.sheet_to_json(excelData);
  return ans;
}

function dirCreater(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }
}
