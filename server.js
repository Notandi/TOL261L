const express = require('express');
const MusicGen = require('./MusicGen');
const bodyParser = require('body-parser');


const app = express();

const myPythonScriptPath = 'pythonscripts/script.py';

// Use python shell
var PythonShell = require('python-shell');

const scales = {
"CMajor":[0,2,4,5,7,9,11],
"GMajor":[7,9,11,0,2,4,6],
"DMajor":[2,4,6,7,9,11,1],
"AMajor":[9,11,1,2,4,6,8],
"EMajor":[4,6,8,9,11,1,3],
"BMajor":[11,1,3,4,6,8,10],
"F#Major":[6,8,10,11,1,3,5],
"DbMajor":[1,3,5,6,8,10,0],
"AbMajor":[8,10,0,1,3,5,7],
"EbMajor":[3,5,7,8,10,0,2],
"BbMajor":[10,0,2,3,5,7,9],
"FMajor":[5,7,9,10,0,2,4],
"Cminor":[0,2,3,5,7,8,10],
"Gminor":[7,9,10,0,2,3,5],
"Dminor":[2,4,5,7,9,10,0],
"Aminor":[9,11,0,2,4,5,7],
"Eminor":[4,6,7,9,11,0,2],
"Bminor":[11,1,2,4,6,7,9],
"F#minor":[6,8,9,11,1,2,4],
"C#minor":[1,3,4,6,8,9,11],
"G#minor":[8,10,11,1,3,4,6],
"Ebminor":[3,5,6,8,10,11,1],
"Bbminor":[10,0,1,3,5,6,8],
"Fminor":[5,7,10,0,1,3]
};
var options = {
  mode: 'json',
};
var pyshell = new PythonShell(myPythonScriptPath);
pyshell.send(JSON.stringify({scale: scales.CMajor,
              test: "stuff"}));
pyshell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log(message);
});
pyshell.end(function (err) {
    if (err){
        throw err;
    };
});

app.set('port', (process.env.PORT || 3001));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/api/music', (req, res) => {
  const List = MusicGen();
  res.json(List);
});

app.post('/api/pitches', (req, res) => {
  console.log(req.body)
  var pyshell = new PythonShell(myPythonScriptPath);
  pyshell.send(JSON.stringify({scale: scales.CMajor,
                test: "stuff"}));
  pyshell.on('message', function (message) {
      // received a message sent from the Python script (a simple "print" statement)
      console.log(message);
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
