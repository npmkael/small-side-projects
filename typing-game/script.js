"use strict";
let getQuotes;
let randomNum;

const words = document.getElementById("words");

function getRandomQuote() {
  return fetch("random-quotes.json")
    .then((response) => response.json())
    .then((data) => data.quotes);
}

async function getNextNote() {
  const quotes = await getRandomQuote();
  randomNum = Math.floor(Math.random() * quotes.length);
  let quote = quotes[randomNum].quote;

  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;

    words.appendChild(characterSpan);
  });
}

getNextNote();
