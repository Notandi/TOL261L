// quarter (.I) nóta er = 60/x þar sem x er bpm fyrir 120 bpm er lengdin 0.5 sec

let pitchList = [36, 36, 41, 41, 46, 41, 41, 36, 41, 41, 33, 41, 36, 36, 41, 41, 46, 41, 41, 36, 41, 41, 33, 41, 36, 36, 41, 41, 46, 43, 40, 35, 40, 43, 35, 43, 35, 35, 40, 35, 40, 45, 40, 37, 42, 42, 34, 31, 36, 33, 41, 36, 41, 46, 41, 36, 41, 41, 36, 33, 36, 33, 41, 36, 41, 46, 43, 35, 40, 43, 35, 35, 35, 35, 43, 35, 40, 45, 42, 34, 42, 42, 34, 34, 34, 34, 42, 34, 42, 47, 42, 34, 42, 45, 40, 35, 40, 40, 48, 40, 40, 45, 48, 40, 43, 46, 41, 36, 41, 41, 4,9, 41, 41, 46, 49, 46, 49, 46, 43, 35];
let durationList = [21, 21, 43, 5, 21, 43, 21, 10, 21, 43, 10, 21, 10, 10, 43, 5, 21, 10, 21, 43, 5, 10, 10, 5, 21, 43, 5, 10, 43, 5, 21, 43, 5, 21, 43, 10, 43, 5, 43, 10, 5, 10, 10, 10, 21, 43, 21, 1,0, 43, 43, 5, 10, 21, 10, 21, 21, 43, 43, 21, 43, 43, 5, 43, 5, 21, 21, 43, 5, 21, 5, 21, 21, 21, 10, 21, 43, 43, 5, 10, 10, 10, 43, 43, 21, 10, 10, 43, 5, 21, 10, 10, 21, 43, 10, 21, 21, 10, 5, 43, 21, 21, 43, 21, 21, 10, 10, 21, 21, 21, 43, 5, 43, 10, 21, 10, 5, 10, 21, 43];
let attackList = [24, 24, 48, 6, 24, 48, 24, 12, 24, 48, 12, 24, 12, 12, 48, 6, 24, 12, 24, 48, 6, 12, 12, 6, 24, 48, 6, 12, 48, 6, 24, 48, 6, 24, 48, 12, 48, 6, 48, 12, 6, 12, 12, 12, 24, 48, 24, 1,2, 48, 48, 6, 12, 24, 12, 24, 24, 48, 48, 24, 48, 48, 6, 48, 6, 24, 24, 48, 6, 24, 6, 24, 24, 24, 12, 24, 48, 48, 6, 12, 12, 12, 48, 48, 24, 12, 12, 48, 6, 24, 12, 12, 24, 48, 12, 24, 24, 12, 6, 48, 24, 24, 48, 24, 24, 12, 12, 24, 24, 24, 48, 6, 48, 12, 24, 12, 6, 12, 24, 48];
let velocityList = [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 5,5, 55, 55, 55, 55, 55, 55, 55, 55, 55];
let channelsList = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

//laga bpm tímavillu
const bpmToTime = 0.00260416666;
const ac = new AudioContext();
let bpm = 120;
let instrument = 'acoustic_grand_piano';
let lists = {pitchList,durationList,attackList,velocityList,channelsList};

// breytir upplýsingum úr listum í spilanlegt lag með völdu hljóðfæri
function play(lists,instrument){
  console.log("red");
  Soundfont.instrument(ac, 'contrabass',{ soundfont: 'MusyngKite' }).then(function (bass){
  Soundfont.instrument(ac, instrument, { soundfont: 'MusyngKite' }).then(function (player){
    console.log("blue");
    let time = 0;
    for(let i = 0; i < lists.pitchList.length; i++){
      console.log(lists.pitchList[i]);
      player.play( lists.pitchList[i] ,ac.currentTime + time, {duration: (bpmToTime* (lists.durationList[i]* (bpm/60))), gain: (lists.velocityList[i]/127) * 3 });
      bass.play( lists.pitchList[i] ,ac.currentTime + time, {duration: (bpmToTime* (lists.durationList[i]* (bpm/60))), gain: (lists.velocityList[i]/127) * 3 });
      time += (bpmToTime* (lists.attackList[i]*(bpm/60)));
    }
  });
  });
};

play(lists, instrument);

//hvað options gera
// gain: float between 0 to 1
// attack: the attack time of the amplitude envelope
// decay: the decay time of the amplitude envelope
// sustain: the sustain gain value of the amplitude envelope
// release: the release time of the amplitude envelope
// adsr: an array of [attack, decay, sustain, release]. Overrides other parameters.
// duration: set the playing duration in seconds of the buffer(s)
// loop: set to true to loop the audio buffer
