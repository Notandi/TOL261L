// gefur random tölu á milli min og max
function random(min, max){
  const rand = (Math.round(Math.random() * (max - min))) + min;
  return rand;
}

// ef að val er á milli eða jafnt min eða max return true annars false
function isBetween(val, min, max){
  return val >= min && val <= max ? true: false;
}

// Fall sem að fjarlægir duplicate values úr fylki
function removeDuplicates(arr){
  for(let i = 0; i < arr.length;  i++){
    for(let j= i + 1; j < arr.length; j++){
      if (arr[i] === arr[j]) arr.splice(j,1);
    }
  }
  return arr;
}

// Fall sem að gáir hvort að value komi fyrir í fylki
function isMember(val, arr){
  for(let i = 0; i < arr.length; i++){
    if (arr[i] === val) return true;
  }
  return false;
}

// skilar true ef tala er neikvæð
function isMinus(val){
  return val < 0 ? true: false;
}

// skilar true ef tala er jákvæð
function isPlus(val){
  return val > 0 ? true: false;
}

// skilar true ef að val1 og val2 eru með sama formerki
function sameSign(val1, val2){
  if (isMinus(val1) && isMinus(val2)) return true;
  if (isPlus(val1) && isPlus(val2)) return true;
  return false;
}

// rotate-ar array ex. [0,1,2] --> [1,2,0]
function rotate(arr) {
  const temp = arr[0];
  for (let i = 1; i < arr.length ; i++){
    arr[i-1] = arr[i]
  }
  arr[arr.length - 1]  = temp;
}

// Býr til valid pitch sem að uppfyllir öll skilyrði
function createValidPitch(scale, intervalRules, minPitch, maxPitch, lastpitch){
  let pitch = random(minPitch, maxPitch);
  let note = pitch%12;
  let interval = Math.abs(pitch - lastpitch);
  while(!(isMember(note, scale) && isMember(interval,intervalRules))){
    pitch = random(minPitch, maxPitch);
    interval = Math.abs(pitch - lastpitch);
    note = pitch%12;
  }
  return pitch;
}

// Býr til nokkur random start pitches svo að hægt sé að byrja að búa til pitches til þess að bera saman við theme og bæta við lagið
function createValidStartPitches(noNotes, scale, intervalRules, minPitch, maxPitch){
  let pitches = [];
  let lastpitch = random(minPitch, maxPitch);
  let lastnote = lastpitch%12;
  while (!(isMember(lastnote, scale))){
    lastpitch = random(minPitch, maxPitch);
    lastnote = lastpitch%12;
  }
  pitches.push(lastpitch);
  noNotes = noNotes - 1;
  while( noNotes > 0){
    pitches.push(createValidPitch(scale, intervalRules, minPitch, maxPitch, lastpitch));
    noNotes = noNotes-1;
  }
  return pitches;
}

//Gáir á öllum möguleikum fyrir næsta pitch útfrá intervalRules og skilar þeim sem uppfylla þau skilyrði að vera í scale og undir maxPitch og yfir minPitch
function createAllValidPitches( scale, intervalRules, minPitch, maxPitch, lastpitch){
  let validPitches = [];
  intervalRules.map((interval) => {
    let testPitch = lastpitch - interval;
    let testNote = testPitch%12;
    if(isMember(testNote, scale) && isBetween(testPitch, minPitch, maxPitch)){
      validPitches.push(testPitch);
    }
    testPitch = lastpitch + interval;
    testNote = testPitch%12;
    if(isMember(testNote, scale) && isBetween(testPitch, minPitch, maxPitch)){
      validPitches.push(testPitch);
    }
  });
  removeDuplicates(validPitches);
  return validPitches;
}

//theme föll

// rennur í gegnum allar mögulegar nótur og skilar þeirri sem að er líkust þemanum
function keepTheme(theme, possiblePitches, previousPitches){
  let chances = [];
  for (let i = 0; i < possiblePitches.length; i++){
    let notes = previousPitches;
    notes.push(possiblePitches[i]);
    chances.push(themeChecker(theme, notes));
    notes.pop()
  }
  let max = 0;
  let maxval = 0;
  for (let i = 0; i < chances.length; i++){
    if (chances[i] >= maxval){
      maxval = chances[i];
      max = i;
    }
  }
  return possiblePitches[max];
}

// skilar hversu líkt þetta er þemanum miðað við fjóra mismunandi hluti sem að hafa mismunandi vigtir
function themeChecker( themelist, notelist){
  const theme = makeIntervalArray(themelist);
  const notes = makeIntervalArray(notelist);
  const intervals = intervalValue(theme, notes);
  const intervalPositions = intervalPositionsValue(theme, notes);
  const intervalDirection = intervalDirectionValue(theme, notes);
  const relation = relationValue(theme, notes);
  const result = (intervals * 0.2) + (intervalPositions * 0.4) + (intervalDirection * 0.3) + (relation * 0.1);
  return result;
}

// býr til tónbila array fyrir array á nótum
function makeIntervalArray (arr){
  let intervalArr = [];
  for(let i = 1; i < arr.length; i++){
    intervalArr.push(arr[i-1] - arr[i]);
  }
  return intervalArr;
}

// skilar gildi frá 0-1 theme eftir því hversu mörg tónbil eru eins
function intervalValue( theme, notes ){
  let count = 0;
  for (let i = 0; i < notes.length; i++){
    if(isMember(notes[i],theme)) count++;
  }
  return count/theme.length;
}

// skilar gildi frá 0-1 theme eftir því hversu mörg tónbil eru eins á sama stað
function intervalPositionsValue(theme, notes){
  let count = 0;
  for (let i = 0; i < notes.length; i++){
    if(Math.abs(notes[i]) === Math.abs(theme[i])) count++;
  }
  return count/theme.length;
}


// skilar gildi frá 0-1 theme eftir því hversu mörg tónbilana séu með sömu stefnu
function intervalDirectionValue(theme, notes){
  let count = 0;
  for (let i = 0; i < notes.length; i++){
    if(sameSign(notes[i], theme[i])) count++;
  }
  return count/theme.length;
}

//skilar gildi frá 0-1 eftir skyldleika
function relationValue (theme, notes){
  let count = 0;
  for(let i = 0; i < notes.length; i++){
    if (notes[i] + theme[i] === 12) count++;
  }
  return count/theme.length;
}

//Markov keðjuföll

// skilar random gildum útfrá markovkeðjunnimatrixunni. Fjöldi gilda sem er skilað er skilgreint með noValues
function markovChain(valueArray, rowMatrix, noValues){
  let outlist = [];
  let currentValue = random(0,valueArray.length-1);
  for (let i = 0; i < noValues; i++){
    currentValue = rowValue(rowMatrix[currentValue]);
    outlist.push(valueArray[currentValue]);
  }
  return outlist;
}

// tekur röð í markovkeðjumatrixunni og skilar hvaða röð var fyrir valinu útfrá gefnum líkum í markovkeðjunni
function rowValue(row){
  const random = Math.random();
  let chancevalue = 0;
  for (let i = 0; i < row.length; i++){
    chancevalue += row[i];
    if (random < chancevalue) return i;
  }
}

// Býr til pitchlista fyrir tónlistina segir til um hvaða nóta er spiluð
function createPitchList(noNotes, theme, scale, intervalRules, minPitch, maxPitch) {
  let possiblePitches = [];
  let pitchlist = [];
  let pitch;
  let previousPitches = createValidStartPitches(theme.length, scale, intervalRules, minPitch, maxPitch);
  while(noNotes > 0){
    const lastpitch = previousPitches[previousPitches.length-1];
    possiblePitches = createAllValidPitches(scale, intervalRules, minPitch, maxPitch, lastpitch);
    previousPitches.reverse();
    previousPitches.pop();
    previousPitches.reverse();
    pitch = keepTheme( theme, possiblePitches, previousPitches);
    pitchlist.push(pitch);
    previousPitches.push(pitch);
    noNotes = noNotes-1;
    rotate(theme);
  }
  return pitchlist;
}

// Býr til attack lista sem að segir til um hvenær á að spila nótu
function createAttackList(noNotes, theme, attackMatrix){
  return markovChain(theme, attackMatrix, noNotes);
}
// Býr til duration lista sem að segir um til hversu lengi nótan lyfir
function createDurationList(attackDelta, ratio){
  const duration = attackDelta.map(function(x){
    return x * ratio;
  });
  return duration;
  // til þess að testa í byrjun verður þetta alltaf sama duration
}
// Býr til velocity lista sem að  segir til um hversu "öflug" nótan er
function createVelocityList(noNotes, intensity){
  const velList = [];
  for(let i = 0; i < noNotes; i++){
    velList.push(intensity);
  }
  return velList;
  // til þess að testa í byrjun verða allar nótur jafn öflugar

}
// Býr til channel lista sem að segir til um á hvaða channeli á að spila nótu, gefur möguleika á að spila margar nótur á mismunandi channelum
function createChannelsList(noNotes, channel){
  const chanList = [];
  for(let i = 0; i < noNotes; i++){
    chanList.push(channel);
  }
  return chanList;
  // til þess að testa í byrjun verður þetta allt á sama channeli nota síðan mörg channel til þess að búa til betra tónverk
}


var MusicGen = function (){
  let pList = createPitchList(120, [9, 11, 4, 2, 7, 7, 7, 9, 11, 5],[0,2,4,5,7,9,11], [0,1,2,4,6,8],30,90 );
  let aList = createAttackList (120, [64, 96], [[0.75, 0.25],[0.75, 0.25]]);
  let dList = createDurationList(aList, 0.9);
  let vList = createVelocityList(120,127);
  let cList = createChannelsList(120,0);
  const masterList = {pitchList: pList, attackList: aList, durationList: dList, velocityList: vList, channelsList: cList};
  return masterList;
}

module.exports = MusicGen;
