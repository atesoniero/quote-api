const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
  });
  
// Get a random quote
app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
        res.send(randomQuote);
});

app.get('/api/quotes', (req, res, next) => {
    const arrayQuotes = []
    // if no ?person= query
    if (!req.query.person) {
       quotes.forEach(element => {arrayQuotes.push(element.quote)}) 
       res.send(arrayQuotes)
    } else {
        //console.log(req.query.person)
        quotes.filter(element => {  return (element.person === req.query.person) })
        .forEach(element => {arrayQuotes.push(element.quote)});
        //console.log(arrayQuotes)
        res.send(arrayQuotes)    
    }
})