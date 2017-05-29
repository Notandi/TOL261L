import React from 'react';
import Music from '../components/Music';
import Home from '../components/Home';
import Synth from '../../Module/Keyboard';
var Soundfont = require('soundfont-player');

var keyboard = new Synth();



var keyMap = {
  65: "key1",
  87: "key2",
  83: "key3",
  69: "key4",
  68: "key5",
  70: "key6",
  84: "key7",
  71: "key8",
  89: "key9",
  72: "key10",
  85: "key11",
  74: "key12"
}


var waves = ["triangle","square","sine","sawtooth"];
var songlengths = ["short", "normal", "long"];
var songlengthData = [60, 120, 240];
var rythms = ["slow", "normal", "fast"];
var rythmData = [{ticks:[64, 96], markov:[[0.75, 0.25],[0.75, 0.25]]},{ticks:[64, 96], markov:[[0.75, 0.25],[0.75, 0.25]]} , {ticks:[64, 96], markov:[[0.75, 0.25],[0.75, 0.25]]}];
var distributions = ["unvaried","normal","varied"];
var distributiondata = [{distribution: [0.35,0.13,0.13,0.065,0.065,0.13,0.13],
modifierDistribution: [0.05,0.1,0.15,0.35,0.15,0.1,0.05,0.025,0.025]},
{distribution: [0.35,0.13,0.13,0.065,0.065,0.13,0.13],
modifierDistribution: [0.05,0.1,0.15,0.35,0.15,0.1,0.05,0.025,0.025]},
{distribution: [0.35,0.13,0.13,0.065,0.065,0.13,0.13],
modifierDistribution: [0.05,0.1,0.15,0.35,0.15,0.1,0.05,0.025,0.025]}];
var scales = ["CMajor","GMajor","DMajor","AMajor","EMajor","BMajor","F#Major","DbMajor","AbMajor","EbMajor","BbMajor","FMajor","Cminor","Gminor","Dminor","Aminor","Eminor","Bminor","F#minor","C#minor","G#minor","Ebminor","Bbminor","Fminor"]
var scaleData = [[0,2,4,5,7,9,11],[7,9,11,0,2,4,6],[2,4,6,7,9,11,1],[9,11,1,2,4,6,8],[4,6,8,9,11,1,3],[11,1,3,4,6,8,10],[6,8,10,11,1,3,5],[1,3,5,6,8,10,0],[8,10,0,1,3,5,7],[3,5,7,8,10,0,2],[10,0,2,3,5,7,9],[5,7,9,10,0,2,4],[0,2,3,5,7,8,10],[7,9,10,0,2,3,5],[2,4,5,7,9,10,0],[9,11,0,2,4,5,7],[4,6,7,9,11,0,2],[11,1,2,4,6,7,9],[6,8,9,11,1,2,4],[1,3,4,6,8,9,11],[8,10,11,1,3,4,6],[3,5,6,8,10,11,1],[10,0,1,3,5,6,8],[5,7,10,0,1,3]]
class MusicContainer extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor (props) {
    super(props);
    this.playNote = this.playNote.bind(this);
    this.releaseNote = this.releaseNote.bind(this);
    this.rightWave = this.rightWave.bind(this);
    this.leftWave = this.leftWave.bind(this);
    this.leftRythm = this.leftRythm.bind(this);
    this.rightRythm = this.rightRythm.bind(this);
    this.leftScale = this.leftScale.bind(this);
    this.rightScale = this.rightScale.bind(this);
    this.leftLength = this.leftLength.bind(this);
    this.rightLength = this.rightLength.bind(this);
    this.leftDistribution = this.leftDistribution.bind(this);
    this.rightDistribution = this.rightDistribution.bind(this);
    this.onGenerateMusic = this.onGenerateMusic.bind(this);
    this.playMusic = this.playMusic.bind(this);
    this.state = {
      selector: true,
      songlength : "normal",
      songlengthIndex : 1,
      rythm : "normal",
      rythmIndex : 1,
      distribution : "normal",
      distributionIndex : 1,
      scale : "CMajor",
      scaleIndex : 0,
      octave: 4,
      waveForm: "triangle",
      waveIndex: 0,
      key1: "",
      key2: "",
      key3: "",
      key4: "",
      key5: "",
      key6: "",
      key7: "",
      key8: "",
      key9: "",
      key10: "",
      key11: "",
      key12: "",
    }
  }
  playMusic () {
  const bpmToTime = 0.00260416666;
  const ac = new AudioContext();
  let bpm = 120;
  fetch('api/music',
  {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({scale: scaleData[this.state.scaleIndex],
                              noNotes: songlengthData[this.state.songlengthIndex],
                              intensity: 127,
                              duration: 0.9,
                              ticks : rythmData[this.state.rythmIndex].ticks,
                              markov : rythmData[this.state.rythmIndex].markov,
                              distribution: distributiondata[this.state.distributionIndex].distribution,
                              modifierDistribution: distributiondata[this.state.distributionIndex].modifierDistribution
                            })
  })
    .then(function (response){
      response.json()
      .then(function (pythonJSON) {
        let jsonResponse = JSON.parse(pythonJSON);
        let pitchlist = jsonResponse.pitchlist;
        let attacklist = jsonResponse.attacklist;
        let durationlist = jsonResponse.durationlist;
        let velocitylist = jsonResponse.velocitylist;
        Soundfont.instrument(ac, 'acoustic_grand_piano', { soundfont: 'MusyngKite' }).then(function (player){
          let time = 0;
          for(let i = 0; i < pitchlist.length; i++){
            player.play( pitchlist[i] ,ac.currentTime + time, {duration: (bpmToTime* (durationlist[i]* (bpm/60))), gain: (velocitylist[i]/127) * 3 });
            time += (bpmToTime* (attacklist[i]*(bpm/60)));
          }
        });
      })
    })
  }
  rightWave() {
    this.state.waveIndex++;
    if (this.state.waveIndex > waves.length-1) this.state.waveIndex=0;
    var wave = waves[this.state.waveIndex];
    this.setState({waveForm : wave});
    keyboard.changeWaveRight();
  }
  leftWave() {
    this.state.waveIndex--;
    if (this.state.waveIndex < 0) this.state.waveIndex=3;
    var wave = waves[this.state.waveIndex];
    this.setState({waveForm : wave});
    keyboard.changeWaveLeft();
  }
  playNote (input) {
    var keystroke = input.keyCode;
    var oct = this.state.octave;
    if (keystroke === 81 && this.state.octave > 1) {
      keyboard.downAnOctave();
      oct--;
      this.setState({octave : oct});
    }
    else if (keystroke === 73 && this.state.octave < 8) {
      keyboard.upAnOctave();
      oct++;
      this.setState({octave : oct});
    }
    else if (keystroke === 37) {
      this.leftWave();
    }
    else if (keystroke === 39) {
      this.rightWave();
    }
    else {
      keyboard.play(keystroke);
      for (var code in keyMap) {
        if (Number(code) === Number(keystroke)) {
            var key = keyMap[code];
            var obj = {};
            obj[key] = 'active';
            this.setState(obj);
          }
      }
    }
  }

  releaseNote (input) {
    var keystroke = input.keyCode;
    keyboard.stop(keystroke);
    for (var code in keyMap) {
      if (Number(code) === Number(keystroke)) {
          var key = keyMap[code];
          var obj = {};
          obj[key] = '';
          this.setState(obj);
        }
    }
  }

  rightLength(){
    console.log("here i am")
    this.state.songlengthIndex++;
    if (this.state.songlengthIndex > songlengths.length-1) this.state.songlengthIndex=0;
    var songlength = songlengths[this.state.songlengthIndex];
    this.setState({songlength : songlength});
  }
  leftLength(){
    this.state.songlengthIndex--;
    if (this.state.songlengthIndex < 0) this.state.songlengthIndex= songlengths.length-1;
    var songlength = songlengths[this.state.songlengthIndex];
    this.setState({songlength : songlength});
  }

  rightRythm(){
    this.state.rythmIndex++;
    if (this.state.rythmIndex > rythms.length-1) this.state.rythmIndex=0;
    var rythm = rythms[this.state.rythmIndex];
    this.setState({rythm : rythm});
  }
  leftRythm(){
    this.state.rythmIndex--;
    if (this.state.rythmIndex < 0) this.state.rythmIndex= rythms.length-1;
    var rythm = rythms[this.state.rythmIndex];
    this.setState({rythm : rythm});
  }

  rightScale(){
    this.state.scaleIndex++;
    if (this.state.scaleIndex > scales.length-1) this.state.scaleIndex=0;
    var scale = scales[this.state.scaleIndex];
    this.setState({scale : scale});
  }
  leftScale(){
    this.state.scaleIndex--;
    if (this.state.scaleIndex < 0) this.state.scaleIndex= scales.length-1;
    var scale = scales[this.state.scaleIndex];
    this.setState({scale : scale});
  }

  rightDistribution(){
    this.state.distributionIndex++;
    if (this.state.distributionIndex > distributions.length-1) this.state.distributionIndex=0;
    var distribution = distributions[this.state.distributionIndex];
    this.setState({distribution: distribution});
  }
  leftDistribution(){
    this.state.distributionIndex--;
    if (this.state.distributionIndex < 0) this.state.distributionIndex= distributions.length-1;
    var distribution = distributions[this.state.distributionIndex];
    this.setState({distribution: distribution});
  }

  onGenerateMusic(){
    this.setState({selector: false});
  }

  render () {
    if (this.state.selector == true){
      return (
        <Home
          state={this.state}
          setLengthRight={this.rightLength}
          setLengthLeft={this.leftLength}
          setRythmRight={this.rightRythm}
          setRythmLeft={this.leftRythm}
          setScaleRight={this.rightScale}
          setScaleLeft={this.leftScale}
          setDistributionRight={this.rightDistribution}
          setDistributionLeft={this.leftDistribution}
          onGenerateMusic={this.onGenerateMusic}/>
      )
    } else {
      return (
        <Music
          onPlayMusic={this.playMusic}
          onPlayNote={this.playNote}
          onReleaseNote={this.releaseNote}
          keyboardState={this.state}
          setWaveFormRight={this.rightWave}
          setWaveFormLeft={this.leftWave}/>
      )
    }
  }
};

module.exports = MusicContainer;
