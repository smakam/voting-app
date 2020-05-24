var express = require('express');
const bodyParser = require('body-parser');
var app = express();
var path = require('path');
const axios = require('axios')

const BACKEND_URI = `http://${process.env.VOTING_API_ADDR}/vote`
const BACKGROUND = `${process.env.BACKGROUND}`

app.use(bodyParser.json())

app.get('/', function(req, res) {
    if (BACKGROUND == "normal") {
      res.sendFile(path.join(__dirname, 'public', 'index1.html'));
    } else {
      res.sendFile(path.join(__dirname, 'public', 'index2.html'));
    }
});

app.get('/results', function(req, res) {
    if (BACKGROUND == "normal") { 
      res.sendFile(path.join(__dirname, 'public', 'results1.html'));
    } else {
      res.sendFile(path.join(__dirname, 'public', 'results2.html'));
    }
});

app.get('/vote', async (req, res) => {
  axios.get(BACKEND_URI)
    .then(response => {
        res.send(response.data);
    }).catch(error => {
      console.error('error: ' + error)
      res.send(error);
  });
});

app.post('/vote', async (req, res) => {
  axios.post(BACKEND_URI, req.body).then(response => {
      console.log(`response from ${BACKEND_URI}` +  response)
      res.send(response.data);
  }).catch(error => {
      console.error('error: ' + error)
      res.send(error);
  })
});

app.listen(8080, () => console.log(`Nodejs Frontend listening on port 8080! ${BACKEND_URI}, background ${BACKGROUND}`))