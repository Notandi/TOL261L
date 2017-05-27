var Tone = require('tone');


function Keyboard () {
  this.synth = new Tone.PolySynth(8, Tone.Synth).toMaster();
  this.synth.volume.value=10;

}

Keyboard.prototype.activekeys = [];
Keyboard.prototype.keyMap = {
  65: 'C4',
  87: 'C#4',
  83: 'D4',
  69: 'D#4',
  68: 'E4',
  70: 'F4',
  84: 'F#4',
  71: 'G4',
  89: 'G#4',
  72: 'A4',
  85: 'A#4',
  74: 'B4'
};
Keyboard.prototype.notes = {
  65: true,
  87: true,
  83: true,
  69: true,
  68: true,
  70: true,
  84: true,
  71: true,
  89: true,
  72: true,
  85: true,
  74: true
}

// Keyboard.prototype.autoWah;
// Keyboard.prototype.bitCrusher;
// Keyboard.prototype.chebyShev;
// Keyboard.prototype.chorus;
// Keyboard.prototype.distortion;
// Keyboard.prototype.feedbackDelay;
// Keyboard.prototype.freeverb;
// Keyboard.prototype.phaser;
// Keyboard.prototype.pingPongDelay;
Keyboard.prototype.octave = 3;

Keyboard.prototype.waveForms = ["triangle","square","sine","sawtooth"];
Keyboard.prototype.waveIndex = 0;

Keyboard.prototype.changeWaveRight = function () {
  this.waveIndex++;
  if (this.waveIndex > this.waveForms.length-1) this.waveIndex=0;
  for (var i = 0; i < 8 ; i++){
    this.synth.voices[i].oscillator.type=this.waveForms[this.waveIndex];
  }
}
Keyboard.prototype.changeWaveLeft = function () {
  this.waveIndex--;
  if (this.waveIndex < 0) this.waveIndex=3;
  for (var i = 0; i < 8 ; i++){
    this.synth.voices[i].oscillator.type=this.waveForms[this.waveIndex];
  }
}



Keyboard.prototype.setVolume = function (value){
  this.synth.volume.value = value
}

// laga þetta fall
Keyboard.prototype.findNote = function (key){
  for (name in this.keyMap){
    if (key === Number(name)) {
      return this.keyMap[name];
    }
  }
  return false;
}

//laga þetta líka gera betur
Keyboard.prototype.wantToPlay = function (note){
  for (name in this.notes){
    if (String(note) === String(name)) {
      if (this.notes[name]){
        this.notes[name] = false
        return true;
      }
      return false;
    }
  }
  return false;
}

Keyboard.prototype.wantToStop = function (note){
  for (name in this.notes){
    if (String(note) === String(name)) {
      if (!this.notes[name]){
        this.notes[name] = true;
        return false;
      }
      return true;
    }
  }
  return true;
}

Keyboard.prototype.play = function (key) {
  var note = this.findNote(key);
  var canPlay = this.wantToPlay(key);
  if (note && canPlay) {
    this.synth.triggerAttack(note,undefined,0.2)
  }
}

Keyboard.prototype.upAnOctave = function () {
  if (this.octave < (this.octaves.length-1)){
    this.synth.triggerRelease(this.noteArray());
    this.octave++;
    this.keyMap = this.octaves[this.octave];
  }
}

Keyboard.prototype.downAnOctave = function () {
  if (this.octave > 0){
    this.synth.triggerRelease(this.noteArray());
    this.octave--;
    this.keyMap = this.octaves[this.octave];

  }
}

Keyboard.prototype.noteArray = function () {
  var noteArray = []
  for (name in this.keyMap){
    noteArray.push(this.keyMap[name]);
  }
  return noteArray;
}

//arpegiator sem verður kanski bætt við seinna
// Keyboard.prototype.arpegiate = function () {
// }

Keyboard.prototype.stop = function (key) {
  var note = this.findNote(key);
  var canPlay = this.wantToStop(key);
  if (note && !canPlay) {
    this.synth.triggerRelease(note, undefined);
  }
}

// effectar sem ég bæti kanski við seinna
// Keyboard.prototype.addAutoWah = function () {
//   this.autoWah = new Tone.AutoWah(50, 6, -30).toMaster();
//   //initialize the synth and connect to autowah
//   this.synth.connect(this.autoWah);
//   //Q value influences the effect of the wah - default is 2
//   this.autoWah.Q.value = 6;
// }
//
// Keyboard.prototype.addBitCrusher = function (value) {
//   if(this.bitCrusher){
//     this.bitCrusher.bits = value;
//   }else {
//     this.bitCrusher = new Tone.BitCrusher(value).toMaster();
//     this.synth.connect(this.bitCrusher);
//   }
// }
//
// Keyboard.prototype.addChebyshev = function () {
//   //create a new cheby
//   this.Chebyshev = new Tone.Chebyshev(50);
//   //create a monosynth connected to our cheby
//   this.synth.connect(this.chebyShev);
// }
//
// Keyboard.prototype.addChorus = function () {
//   this.chorus = new Tone.Chorus(4, 2.5, 0.5);
//   this.synth.connect(this.chorus);
// }
//
// Keyboard.prototype.addDistortion = function (value) {
//   if (this.distortion){
//     this.distortion.distortion = value;
//   } else {
//     this.distortion = new Tone.Distortion(value).toMaster();
//     this.distortion.oversample = "4x";
//     this.synth.connect(this.distortion);
//   }
// }
//
// Keyboard.prototype.addFeedbackDelay = function (value) {
//   if (this.feedbackDelay){
//     this.feedbackDelay.delayTime = value;
//   }else{
//     this.feedbackDelay = new Tone.FeedbackDelay(value, 0.5).toMaster();
//     this.synth.connect(this.feedbackDelay);
//   }
// }
//
// Keyboard.prototype.addFreeverb = function () {
//   this.freeverb = new Tone.Freeverb().toMaster();
//   this.freeverb.dampening.value = 1000;
//   //routing synth through the reverb
//   this.synth.connect(this.freeverb);
// }
//
// Keyboard.prototype.addPhaser = function () {
//   if(this.phaser){
//     this.phaser.dispose();
//     this.phaser = new Tone.Phaser({
//     	"frequency" : 200,
//     	"octaves" : 8,
//     	"baseFrequency" : 2000
//     }).toMaster();
//     this.synth.connect(this.phaser);
//     console.log(this.phaser);
//   }else{
//     this.phaser = new Tone.Phaser({
//   	"frequency" : 15,
//   	"octaves" : 5,
//   	"baseFrequency" : 1000
//     }).toMaster();
//     this.synth.connect(this.phaser);
//   }
// }
//
// Keyboard.prototype.addPingPongDelay = function () {
//   this.pingPongDelay = new Tone.PingPongDelay("4n", 0.2).toMaster();
//   this.synth.connect(this.pingPongDelay);
// }
Keyboard.prototype.octaves = [{
  65: 'C1',
  87: 'C#1',
  83: 'D1',
  69: 'D#1',
  68: 'E1',
  70: 'F1',
  84: 'F#1',
  71: 'G1',
  89: 'G#1',
  72: 'A1',
  85: 'A#1',
  74: 'B1'
},
{
  65: 'C2',
  87: 'C#2',
  83: 'D2',
  69: 'D#2',
  68: 'E2',
  70: 'F2',
  84: 'F#2',
  71: 'G2',
  89: 'G#2',
  72: 'A2',
  85: 'A#2',
  74: 'B2'
},
{
  65: 'C3',
  87: 'C#3',
  83: 'D3',
  69: 'D#3',
  68: 'E3',
  70: 'F3',
  84: 'F#3',
  71: 'G3',
  89: 'G#3',
  72: 'A3',
  85: 'A#3',
  74: 'B3'
},
{
  65: 'C4',
  87: 'C#4',
  83: 'D4',
  69: 'D#4',
  68: 'E4',
  70: 'F4',
  84: 'F#4',
  71: 'G4',
  89: 'G#4',
  72: 'A4',
  85: 'A#4',
  74: 'B4'
},
{
  65: 'C5',
  87: 'C#5',
  83: 'D5',
  69: 'D#5',
  68: 'E5',
  70: 'F5',
  84: 'F#5',
  71: 'G5',
  89: 'G#5',
  72: 'A5',
  85: 'A#5',
  74: 'B5'
},
{
  65: 'C6',
  87: 'C#6',
  83: 'D6',
  69: 'D#6',
  68: 'E6',
  70: 'F6',
  84: 'F#6',
  71: 'G6',
  89: 'G#6',
  72: 'A6',
  85: 'A#6',
  74: 'B6'
},
{
  65: 'C7',
  87: 'C#7',
  83: 'D7',
  69: 'D#7',
  68: 'E7',
  70: 'F7',
  84: 'F#7',
  71: 'G7',
  89: 'G#7',
  72: 'A7',
  85: 'A#7',
  74: 'B7'
},
{
  65: 'C8',
  87: 'C#8',
  83: 'D8',
  69: 'D#8',
  68: 'E8',
  70: 'F8',
  84: 'F#8',
  71: 'G8',
  89: 'G#8',
  72: 'A8',
  85: 'A#8',
  74: 'B8'
}];


module.exports = Keyboard;
