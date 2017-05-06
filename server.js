const express = require('express');
const MusicGen = require('./MusicGen');
const MarkovChain = require('./MarkovChain');

const app = express();

var myPythonScriptPath = 'pythonscripts/script.py';

// Use python shell
var PythonShell = require('python-shell');
var pyshell = new PythonShell(myPythonScriptPath);

pyshell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log(message);
});

// end the input stream and allow the process to exit
pyshell.end(function (err) {
    if (err){
        throw err;
    };

    console.log('finished');
});
app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/api/music', (req, res) => {
  const param = req.query.q;
  var List = MusicGen();
  res.json(List);
});

app.get('/api/testing', (req, res) => {
  const param = req.query.q;
  var List = MarkovChain();
  res.json(List);
});

app.get('/api/testing2', (req, res) => {
  var pyshell = new PythonShell(myPythonScriptPath);
  pyshell.on('message', function (message) {
      // received a message sent from the Python script (a simple "print" statement)
      res.send(message);
  });
  pyshell.end(function (err) {
      if (err){
          throw err;
      };

      console.log('finished');
  });
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
