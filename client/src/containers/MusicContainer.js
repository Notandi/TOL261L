var React = require('react');
var Music = require('../components/Music');
var Soundfont = require('soundfont-player');

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

var MusicContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  playMusic: function () {
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
        body: JSON.stringify({scale: scales.CMajor,
                                noNotes: 120,
                                intensity: 127,
                                duration: 0.9,
                                ticks : [64, 96],
                                markov : [[0.75, 0.25],[0.75, 0.25]],
                                distribution: [0.35,0.13,0.13,0.065,0.065,0.13,0.13],
                                modifierDistribution: [0.05,0.1,0.15,0.35,0.15,0.1,0.05,0.025,0.025]
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
  },
  render: function () {
    return (
      <Music
        onPlayMusic={this.playMusic}/>
    )
  }
})

module.exports = MusicContainer;
