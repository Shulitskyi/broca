import * as fs from "fs";
import clock from "clock";
import document from "document";

let background = document.getElementById("background");
let screen = document.getElementById("screen");

const clockLabel = document.getElementById("clock-label");
const clockMonth = document.getElementById("clock-month");
const clockWeekDay = document.getElementById("clock-weekday");
const clockDay = document.getElementById("clock-day");
const partOfDay = document.getElementById("clock-part-of-day");

const orangeDot = document.getElementById("orange-dot");
const greenDot = document.getElementById("green-dot");
const greenDotArea = document.getElementById("green-dot-area");
const orangeDotArea = document.getElementById("orange-dot-area");

let hanzi = document.getElementById("hanzi");
let pinyin = document.getElementById("pinyin");
let eng = document.getElementById("eng");
let dividerTop = document.getElementById("dividerTop");
let dividerBottom = document.getElementById("dividerBottom");
let counter = 1;
let randKey = 0;
let newRand = 0;

let thisDate = Date();

let months = ["一月", "二月", "三月", 
              "四月", "五月", "六月", 
              "七月", "八月", "九月", 
              "十月", "十一月", "十二月"];
let days = ["一","二","三","四","五",
            "六","七","八","九","十",
            "十一","十二","十三","十四","十五",
            "十六","十七","十八","十九","二十",
            "二十一","二十二","二十三","二十四","二十五",
            "二十六","二十七","二十八","二十九","三十","三十一"];
let weekDays = ["周日","周一","周二","周三","周四","周五","周六"];

//

let fh = 0;
let fileName="learntWords_v7.cbor";
let wordString = '';

//setup variables for the record format

let recSize = 8;
let buffer = new ArrayBuffer(recSize);
let wordId = new Uint32Array (buffer,0,1); // 2 x 4 bytes

let myDate=Date.now()
let recCount=0;

let t = 0;

// auto generate dict
// adjust font size 

let json_dict = fs.readFileSync("/mnt/assets/resources/A2.txt", "json");

let dictSize = Object.keys(json_dict).length;

let pair = {};

clock.granularity = "minutes";

randKey = getRandomIntInclusive(1,dictSize);

pair = json_dict[randKey];

hanzi.text = pair.hanzi;
eng.text = pair.translations;
pinyin.text = pair.pinyin;

hanzi.style.fontSize = 80;

clock.addEventListener("tick", (evt) => {
  clockLabel.text = evt.date.toString().slice(16, -13);
  // year
  //console.log(evt.date.getFullYear());
  // month
  clockMonth.text = months[evt.date.getMonth()];
  // day of the week
  clockWeekDay.text = weekDays[evt.date.getDay()];
  // day
  clockDay.text = days[evt.date.getDate() - 1];
  t = parseInt(clockLabel.text.slice(0,2))
  if (t > 0 && t < 5) {
    partOfDay.text = '凌晨';
  } else if (t >= 5 && t < 9) {
    partOfDay.text = '早上';
  } else if (t >= 9 && t < 12) {
    partOfDay.text = '上午';
  } else if (t == 12) {
    partOfDay.text = '中午';
  } else if (t > 12 && t < 18) {
    partOfDay.text = '下午';
  } else if (t >= 18 && t < 23) {
    partOfDay.text = '晚上';
  } else if (t == 0 || t >= 23) {
    partOfDay.text = '夜班';      
  }
});

// capturing the first tap
// after the first tap users should see

screen.addEventListener("click", (evt) => {
  
  if (counter == 1) {
    
  hanzi.y = 80;
  dividerTop.style.display = "inline";
  pinyin.style.display = "inline";
  dividerBottom.style.display = "inline";
  eng.style.display = "inline";
  // show dots
  orangeDot.style.display = "inline";
  orangeDotArea.style.display = "inline";
  greenDot.style.display = "inline";
  greenDotArea.style.display = "inline";
  //
  }
  
});

greenDotArea.addEventListener("click", (evt) => {
    //
    writeRecord(randKey);
    //showFileDetails();
    showRecordsToConsole();
    counter = counter + 1;
    //
    hanzi.y = 150;
    dividerTop.style.display = "none";
    eng.style.display = "none";
    pinyin.style.display = "none";  
    dividerBottom.style.display = "none";
    hanzi.style.display = "none";
    // hide dots
    orangeDot.style.display = "none";
    orangeDotArea.style.display = "none";
    greenDot.style.display = "none";
    greenDotArea.style.display = "none";
    clockLabel.style.display = "inline";
    clockMonth.style.display = "inline";
    clockWeekDay.style.display = "inline";
    clockDay.style.display = "inline";
    partOfDay.style.display = "inline";
  
  counter = 2;
  
    });

orangeDotArea.addEventListener("click", (evt) => {

    //

    //showRecordsToConsole()
    //showFileDetails();



    //

    hanzi.y = 150;

    dividerTop.style.display = "none";

    eng.style.display = "none";

    pinyin.style.display = "none";  

    dividerBottom.style.display = "none";

    hanzi.style.display = "none";

    // hide dots

    orangeDot.style.display = "none";
  
    orangeDotArea.style.display = "none";

    greenDot.style.display = "none";
  
    greenDotArea.style.display = "none";

    clockLabel.style.display = "inline";

    clockMonth.style.display = "inline";

    clockWeekDay.style.display = "inline";

    clockDay.style.display = "inline";

    partOfDay.style.display = "inline";

  

  counter = 2;

  

    });

screen.addEventListener("click", (evt) => {
  

 
  if (counter == 2) {
    
    
    counter = 1;
  // hide clock, show hanzi, hide pinyin
  clockLabel.style.display = "none";
  clockLabel.style.display = "none";
  clockMonth.style.display = "none";
  clockWeekDay.style.display = "none";
  partOfDay.style.display = "none";
  clockDay.style.display = "none";
  pinyin.style.display = "none";
  hanzi.style.display = "inline";
  // reset counter
  counter = 1;
  // generate new random pair
  randKey = getRandomIntInclusive(1,dictSize);
  //****
  //console.log(wordString.match(/\./g).length - 1);
  
  while (wordString.indexOf(randKey) != -1) {
    
      pair = json_dict[randKey]
      console.log('Skipping the word ' + pair.hanzi);
      randKey = getRandomIntInclusive(0,dictSize);
    
  }
 
  pair = json_dict[randKey];
  // feed elements with data
  hanzi.text = pair.hanzi;
  eng.text = pair.translations;
  pinyin.text = pair.pinyin;
  
  }
  });

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  newRand = Math.floor(Math.random() * (max - min + 1)) + min; 
  return newRand;
}
function writeRecord(number) {
  fh = fs.openSync(fileName, 'a+');
  wordId[0] = number;
  fs.writeSync(fh, buffer); // write the record
  fs.closeSync(fh); // and commit changes -- important if you are about to read from the file 
}
function showFileDetails() {
  let stats = fs.statSync(fileName);
  if (stats) {
    recCount=stats.size/recSize;
    //console.log("File size: " + stats.size + " bytes");
    //console.log("Number of Records: " + recCount);
    //console.log("Last modified: " + stats.mtime);
  }  
}

function getNumberOfRecords() {
  recCount=0;
  let stats = fs.statSync(fileName);
  if (stats) {
    recCount=stats.size/recSize;    
  }
  return recCount;
}
function showRecordsToConsole() {
  wordString = '';
  recCount=getNumberOfRecords();
  fh = fs.openSync(fileName, 'r+');
  for (let i = 0; i < recCount; i++) { 
      fs.readSync(fh, buffer, 0, recSize, i*recSize );
      //console.log("Record: "+(i+1)+"  id to delete:"+(wordId[0]));
      if (wordString.indexOf(wordId[0]) == -1) {
          wordString += '.' + (wordId[0]);
      }
  }
  console.log(wordString);
  fs.closeSync(fh); 
}
var customSort = function (a, b) {
    return (Number(a.match(/(\d+)/g)[0]) - Number((b.match(/(\d+)/g)[0])));

}