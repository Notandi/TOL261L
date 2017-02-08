const express = require('express');
const MusicGen = require('./MusicGen');

const app = express();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/api/music', (req, res) => {
  const param = req.query.q;

  var List = MusicGen();

  res.json(List);
  return;

  if (!param) {
    res.json({
      error: 'Missing required parameter `q`',
    });
    return;
  }
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
