const express = require('express');
const MusicGen = require('./MusicGen');

const app = express();

var myPythonScriptPath = 'pythonscripts/script.py';

// Use python shell
var PythonShell = require('python-shell');
var pyshell = new PythonShell(myPythonScriptPath);

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
  var pyshell = new PythonShell(myPythonScriptPath);
  pyshell.on('message', function (message) {
      // received a message sent from the Python script (a simple "print" statement)
      res.json(message);
  });
  pyshell.end(function (err) {
      if (err){
          throw err;
      };
  });
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
