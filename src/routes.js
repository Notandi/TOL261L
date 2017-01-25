/* routes hér */
const express = require('express');

const router = express.Router();

const fs = require('fs');

const Midi = require('jsmidgen');

router.get('/', (req, res, next) => {
  const file = new Midi.File();
  const track = new Midi.Track();
  // file.addTrack(track);
  // track.addNote(0, 'c4', 64);
  // track.addNote(0, 'd4', 64);
  // track.addNote(0, 'e4', 64);
  // track.addNote(0, 'f4', 64);
  // track.addNote(0, 'g4', 64);
  // track.addNote(0, 'a4', 64);
  // track.addNote(0, 'b4', 64);
  // track.addNote(0, 'c5', 64);
  // fs.writeFileSync('test.mid', file.toBytes(), 'binary');
  res.render('index');
});

router.get('/del', (req, res, next) => {
  fs.unlinkSync('test.mid');
  res.send('removed');
});

router.get('/play', (req, res, next) => {
  res.render('play');
});

router.get('*', (req, res, next) => {
  res.status(404).render('message', { message: 'oh no!',
    error: 'Error: Request failed with status code 404' });
});

module.exports = router;
