
const quoteContainer= document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}


function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


//Show New Quote
function newQuote() {

    showLoadingSpinner();

    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log("Quote ONLINE => ",quote);

    // Check if Auther field is blank and replace it with Unkown
    if (!quote.author) {
        authorText.textContent = "UNKNOWN";        
    } else {
        authorText.textContent = quote.author;        
    }
    if (quote.text.length > 120) {
        quoteText.classList.add('long-qoute');
    } else {
        quoteText.classList.remove('long-qoute');
    }

// Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}


// Get Quotes From API online
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // console.log(apiQuotes);
        // console.log(apiQuotes[12]);
        newQuote();
    } catch (error) {

    }
}

// other Example!!! getin API when using proxy
async function getQuoteWithSecondAPI() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
    } catch (error) {
        console.log('whoops, no quote', error);
    }
}


//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


//On Load
getQuotes();


// localApi quotes.js 
function getNewQuotes(){
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    console.log("Quote LOCALY => ", quote);
    if (!quote.author) {
        authorText.textContent = "UNKNOWN";        
    } else {
        authorText.textContent = quote.author;        
    }
    quoteText.textContent = quote.text;
}

//On Load
getNewQuotes();
