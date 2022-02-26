// Call Selectors
let startBtn = document.querySelector(".start");
let levelNameSpan = document.querySelector(".msg .lvl");
let secondsSpan = document.querySelector(".msg .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMsg = document.querySelector(".finish");
// Task 1
let chooseLvl = document.querySelector(".choose-lvl");
let easyInp = document.getElementById("easy");
let normalInp = document.getElementById("normal");
let hardInp = document.getElementById("hard");
// Task 4
let instructionsDiv = document.querySelector(".instructions");
let insOne = document.querySelector(".ins-one");
let insTwo = document.querySelector(".ins-two");
let insThree = document.querySelector(".ins-three");
// Task 5
let h1 = document.querySelector("h1");

// Create Array Words
const normalWords = [
  "Hello",
  "Country",
  "Testing",
  "Youtube",
  "Python",
  "Paradigm",
  "Styling",
  "Coding",
  "Funny",
  "Working",
];

const easyWords = [
  "Code",
  "Test",
  "Rust",
  "Town",
  "Scala",
  "Task",
  "Runner",
  "Roles",
  "Playing",
  "Github",
];

const hardWords = [
  "Programming",
  "Destructuring",
  "Documentation",
  "Dependencies",
  "Javascript",
  "Linkedin",
  "Cascade",
  "Leetcode",
  "Internet",
  "Twitter",
];

// Set Levls
const levls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

// Set Default Level
let defaultLevelName = "Normal"; // Task One Change Level In Check Box From Index Page
lvlSec(defaultLevelName);
// call Function sets If User Forget Choose Level
sets();

// Default Level
let words = normalWords;
// Task 2 create const content orginal length Of Array
const lengthArr = words.length;
getScore();

// Choose Levels Dynamic
easyInp.onclick = function () {
  defaultLevelName = easyInp.value;
  lvlSec(defaultLevelName);
  words = easyWords;
  sets();
  instructions();
};

normalInp.onclick = function () {
  defaultLevelName = normalInp.value;
  lvlSec(defaultLevelName);
  words = normalWords;
  sets();
  instructions();
};

hardInp.onclick = function () {
  defaultLevelName = hardInp.value;
  lvlSec(defaultLevelName);
  words = hardWords;
  sets();
  instructions();
};

// Add Number Of Total words
scoreTotal.innerHTML = words.length;

input.onpaste = function () {
  return false;
};

startBtn.onclick = function () {
  // Hide This Button After Start Game
  this.remove();
  chooseLvl.remove(); // Task 1
  instructionsDiv.remove(); // Task 4
  // To Do not Late Answer After Click Focus Input
  input.focus();
  // Genrate Word Function
  genWords();
};

// Task 5
function getScore() {
  let lastScore = localStorage.getItem("score");
  if (lastScore === null) return h1.innerHTML = "";
  h1.innerHTML = `Your Last Score ${lastScore} from ${lengthArr}`;
}

// Task 4
function instructions() {
  insOne.innerHTML = `1 - When you choose the ${defaultLevelName} level, you will have twice the time on the first word`;
  insTwo.innerHTML = `2 - You must write the word before the time runs out ${lvlSec(
    defaultLevelName
  )}`;
  insThree.innerHTML = `3 - Copying words does not work. You have to write the word as quickly as possible. Good luck`;
}

function sets() {
  // Set Level Name & Seconds & Score
  levelNameSpan.innerHTML = defaultLevelName;
  secondsSpan.innerHTML = lvlSec(defaultLevelName);
  timeLeftSpan.innerHTML = lvlSec(defaultLevelName);
}

function lvlSec(lvlName) {
  let defaultLevelSec = levls[lvlName];
  return defaultLevelSec;
}

function genWords() {
  // Get Rondom Word In Array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // Get Word Index
  let indexWord = words.indexOf(randomWord);
  // Romve Word From Array
  words.splice(indexWord, 1);
  // Show Random Word
  theWord.innerHTML = randomWord;
  // Task 3
  if (defaultLevelName === "Hard") {
    theWord.style.opacity = 0.4;
    theWord.style.textDecoration = "line-through";
    theWord.style.textDecorationColor = "red";
  }
  // Empty Upcoming Words To Remove Old Words
  upcomingWords.innerHTML = "";
  // Gentare Words
  for (let i = 0; i < words.length; i++) {
    //   Create Div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    // Add New Word In Upcoming
    upcomingWords.appendChild(div);
  }
  // Call Start Play Function
  startPlay();
}

function startPlay() {
  // When Start Play Orginal Array Sub One (Task 2)
  let checkFirstWord = lengthArr - 1;
  // Check If Original Array Subtract One Only Give Twice the time (Task 2)
  if (words.length === checkFirstWord) {
    timeLeftSpan.innerHTML = lvlSec(defaultLevelName) * 2;
  } else {
    timeLeftSpan.innerHTML = lvlSec(defaultLevelName);
  }
  // Control Time
  let start = setInterval(() => {
    // Sub time Of time Span
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // Stop Time Game
      clearInterval(start);
      // compare Words Between PC & Player
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // Empty Input Field
        input.value = "";
        // Increase Score
        scoreGot.innerHTML++;
        // Check If Found words In Arrary Or Empty
        if (words.length > 0) {
          // Call Gen words Function To Add New Words
          genWords();
        } else {
          // If Player Win
          let span = document.createElement("span");
          span.className = "good";
          let spanTxt = document.createTextNode("You Wiiiiiiin");
          span.appendChild(spanTxt);
          finishMsg.appendChild(span);
          // Remove Upcoming words box
          upcomingWords.remove();
          svaeResult();
        }
      } else {
        // If Lose Game
        let span = document.createElement("span");
        span.className = "bad";
        let spanTxt = document.createTextNode("Game Over");
        span.appendChild(spanTxt);
        finishMsg.appendChild(span);
        svaeResult();
      }
    }
  }, 1000);
}

function svaeResult() {
  // Set Result In Local Storge
  localStorage.setItem("score", scoreGot.innerHTML);
}
