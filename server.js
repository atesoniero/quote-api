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
        res.send(randomQuote.quote);
});

app.get('/api/quotes', (req, res, next) => {
    const arrayQuotes = []
    // if no ?person= query
    if (!req.query.person) {
       quotes.forEach(element => {arrayQuotes.push(element.quote)}) 
       res.send(arrayQuotes)
    } else { // if ?person= query is given: it will send the quotes if the person exists or send an empy array of it does not
        quotes.filter(element => {  return (element.person === req.query.person) })
        .forEach(element => {arrayQuotes.push(element.quote)});
        res.send(arrayQuotes)    
    }
})

app.post('/api/quotes', (req, res, next) => {
    // Query string look like this: "?person=Steve Jobs&quote=Stay Hungry, Stay Foolish"
    const person = req.query.person;
    const quote = req.query.quote;
    if (person && quote) {
        const newQuote = { quote: quote, person: person};
        quotes.push(newQuote)
        res.send(newQuote.quote)
    } else {
        req.status(400).send('Bad Request');
    }
})