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
    let lists;
    fetch(`/api/music`)
      .then(function (response) {
        response.json()
          .then(function (list) {
              lists = list;
              fetch('/api/pitches')
                .then(function (response){
                  response.json()
                    .then(function (pitch) {
                      let k = 0;
                      let num = "";
                      let arr = new Array();
                      for(let i = 1; i < pitch.length; i++){
                        if (pitch.charAt(i) == ']') {arr[k] = parseInt(num); break; }
                        if (pitch.charAt(i) == ',') {arr[k] = parseInt(num); k++; i++; num = "";}
                        if (pitch.charAt(i) !== ' ') {num += pitch.charAt(i);}
                      }

                      Soundfont.instrument(ac, 'acoustic_grand_piano', { soundfont: 'MusyngKite' }).then(function (player){
                        let time = 0;
                        for(let i = 0; i < arr.length; i++){
                          player.play( arr[i] ,ac.currentTime + time, {duration: (bpmToTime* (lists.durationList[i]* (bpm/60))), gain: (lists.velocityList[i]/127) * 3 });
                          time += (bpmToTime* (lists.attackList[i]*(bpm/60)));
                        }
                      });
                    })
                });
          });
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
