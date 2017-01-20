
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

// Býr til valid pitch sem að uppfyllir öll skilyrði
function createValidPitch(scale, intervalRules, minPitch, maxPitch, lastpitch){
  let pitch = randomPitch(minPitch, maxPitch);
  while(!(isMember((pitch%12), scale) && isMember((pitch%12), Math.abs(pitch - lastpitch)))){
    pitch = randomPitch(minPitch, maxPitch);
  }
  return pitch;
}

// Býr til nokkur random start pitches svo að hægt sé að byrja að búa til pitches til þess að bera saman við tema og bæta við lagið
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


//Gáir á öllum möguleikum fyrir næsta pitch útfrá intervalRules og skilar þeim sem uppfylla þau skilyrði að vera í scale og undir maxPitch og yfir minPitch
function createAllValidPitches( scale, intervalRules, minPitch, maxPitch, lastpitch){
  let validPitches = [];
  intervalRules.map((interval) => {
    let testPitch = lastpitch - interval;
    if(
      (isMember((testPitch%12), scale)) & ((testPitch >= minPitch) & (testPitch <= maxPitch))
    ) validPitches.push(testPitch);
    testPitch = lastpitch + interval;
    if(
      (isMember((testPitch%12), scale)) & ((testPitch >= minPitch) & (testPitch <= maxPitch))
    ) validPitches.push(testPitch);
  });
  removeDuplicates(validPitches);
  return validPitches;
}

// Fall sem að fjarlægir duplicate values í fylki
function removeDuplicates(arr){
  for(let i = 0; i < arr.length;  i++){
    for(let j= i + 1; j < arr.length; j++){
      if (arr[i] === arr[j]) arr.splice(j,1);
    }
  }
  return arr;
}

// Fall sem að gáir hvort að value komi fyrir í fylki
function isMember(value, arr){
  for(let i = 0; i < arr.length; i++){
    if (arr[i] === value) return true;
  }
  return false;
}

// Fall sem að býr til random pitch á milli minPitch og maxPitch
function randomPitch(minPitch, maxPitch){
  let pitch = (Math.round(Math.random() * (maxPitch - minPitch))) + minPitch;
  return pitch;
}


//tema föll

// rennur í gegnum allar mögulegar nótur og skilar þeirri sem að er líkust þemanum
function keepTema(tema, possiblePitches){
  let chances = []
  for (let i = 0; i < possiblePitches.length; i++){
    chances.push(temaChecker(tema, possiblePitches[i]))
  }
  return .............
}

// skilar hversu líkt þetta er þemanum miðað við fjóra mismunandi hluti sem að hafa mismunandi vigtir
function temaChecker( temalist, notelist){

}

// skilar gildi frá 0-lengd tema eftir því hversu mörg tónbil eru eins
function intervalValue( tema, note ){

}

// skilar gildi frá 0-lengd tema eftir því hversu mörg tónbil eru eins á sama stað
function intervalPositionsValue(){

}

// skilar gildi frá 0-lengd tema eftir því hversu mörg tónbilana séu með sömu stefnu
function intervalDirectionValue(){

}

//skilar gildi eftir skyldleika
function relationValue (){

}


function changeListToTema(){

}

//Markov keðjuföll

function markovValues(){

}
function markovChain(){

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
