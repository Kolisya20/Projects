let apiQuotes = [];
let quoteContainer = document.querySelector('#quote-container');
let quoteText = document.querySelector('#quote');
let quoteAuthor = document.querySelector('#author');
let twitterBtn = document.querySelector('#twitter');
let newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

//Show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}



//Show new quote
function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    quoteAuthor.textContent = quote.author;
    //Check if author fieldsisblank and replace it with 'Unknown'
    quoteAuthor.textContent = !quote.author ? 'Unknown' : quote.author;
    
    // //Check Quote length to determine styling
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote')
    } 
    else {
        quoteText.classList.remove('long-quote')
    }

    //Set quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
    // return quote
}

async function getQuotes () {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote()
    } catch (error) {
        //Catch Error Here
    }

}

//Tweet
function tweetQuote () {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event lesteners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

//onLoad
getQuotes()