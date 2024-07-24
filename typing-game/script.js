"use strict";
let getQuotes;
let randomNum;
const textDisplay = document.querySelector("[data-text-display]");
const textInputElement = document.getElementById("textInput");

// TODO:
// Gamemode
// Timer
// Replace Textarea

textInputElement.addEventListener("input", () => {
  const arrTexts = textDisplay.querySelectorAll("span");
  const arrayValue = textInputElement.value.split("");

  let correct = true;
  arrTexts.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    console.log(character);
    if (character === undefined) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
    }
  });

  if (correct) {
    console.log("working");
    getNextNote();
  }
});

function getRandomQuote() {
  return fetch("random-quotes.json")
    .then((response) => response.json())
    .then((data) => data.quotes);
}

async function getNextNote() {
  const quotes = await getRandomQuote();
  randomNum = Math.floor(Math.random() * quotes.length);
  textDisplay.innerHTML = "";
  console.log(randomNum);
  let quote = quotes[randomNum].quote;
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    textDisplay.appendChild(characterSpan);
  });
  textInputElement.value = null;
}

getNextNote();
