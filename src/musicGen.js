
// Býr til pitchlista fyrir tónlistina segir til um hvaða nóta er spiluð
function createPitchList(noNotes, tema, scale, intervalRules, minPitch, maxPitch) {
  let possiblePitches = [];
  let pitchlist = [];
  let pitch;
  while(noNotes > 0){
    possiblePitches = (createAllValidPitches(pitchlist, scale, intervalRules, minPitch, maxPitch));
    pitch = keeptema(................);
    pitchlist.push(pitch);
  }
  return pitchlist;
}

function createValidPitch(scale, intervalRules, minPitch, maxPitch, lastpitch){
  let pitch = randomPitch(minPitch, maxPitch);
  // búa til random pitch sem að brítur ekki intervalRules og er í scale
  while(!(isMember((pitch%12), scale) && isMember((pitch%12), Math.abs(pitch - lastpitch)))){
    pitch = randomPitch(minPitch, maxPitch);
  }
  return pitch;
}

function createValidStartPitches(noNotes, scale, intervalRules, minPitch, maxPitch){
  let pitches = [];
  let lastpitch = randomPitch(minPitch, maxPitch);
  while (!(isMember((lastpitch%12), scale))){
    lastpitch = randomPitch(minPitch, maxPitch);
  }
  pitches.push(lastpitch);
  noNotes = noNotes - 1;
  while( noNotes > 0){
    pitches.push(createValidPitch(scale, intervalRules, minPitch, maxPitch, lastpitch))
    noNotes = noNotes-1;
  }
  return pitches;
}



function createAllValidPitches( scale, intervalRules, minPitch, maxPitch, lastpitch){
  let pitches = [];
  
}

function isMember(value, arr){
  for(var i = 0; i < arr.length; i++){
    if (arr[i] === value) return true;
  }
  return false;
}

function randomPitch(minPitch, maxPitch){
  let pitch = (Math.round(Math.random() * (maxPitch - minPitch))) + minPitch;
  return pitch;
}

function createAllValidPitches() {

}



















// Býr til attack lista sem að segir til um hvenær á að spila nótu
function createAttackList(noNotes tema attackMatrix){

}
// Býr til duration lista sem að segir um til hversu lengi nótan lyfir
function createDurationList(attackDelta ratio){

}
// Býr til velocity lista sem að  segir til um hversu "öflug" nótan er
function createVelocityList(noNotes intensity){

}
// Býr til channel lista sem að segir til um á hvaða channeli á að spila nótu, gefur möguleika á að spila margar nótur á mismunandi channelum
function createChannelsList(noNotes channel){

}
