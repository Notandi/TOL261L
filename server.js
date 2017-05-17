const express = require('express');
const bodyParser = require('body-parser');


const app = express();

const myPythonScriptPath = 'pythonscripts/script.py';

// Use python shell
var PythonShell = require('python-shell');

app.set('port', (process.env.PORT || 3001));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.post('/api/music', (req, res) => {
  var pyshell = new PythonShell(myPythonScriptPath);
  pyshell.send(JSON.stringify({scale: req.body.scale,
                                noNotes: req.body.noNotes,
                                intensity: req.body.intensity,
                                duration: req.body.duration,
                                ticks : req.body.ticks,
                                markov : req.body.markov,
                                distribution: req.body.distribution,
                                modifierDistribution: req.body.modifierDistribution
                              }));
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
