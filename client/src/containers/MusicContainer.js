var React = require('react');
var Music = require('../components/Music');
var Soundfont = require('soundfont-player');


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
        body: JSON.stringify({scale: 1})
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
