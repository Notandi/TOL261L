
// Býr til pitchlista fyrir tónlistina segir til um hvaða nóta er spiluð
function createPitchList(noNotes, tema, scale, intervalRules, minPitch, maxPitch) {
  let possiblePitches = [];
  let pitchlist = [];
  let pitch;
  let previousPitches = createValidStartPitches(tema.length, scale, intervalRules, minPitch, maxPitch);
  while(noNotes > 0){
    const lastpitch = previousPitches[previousPitches.length-1];
    possiblePitches = createAllValidPitches(scale, intervalRules, minPitch, maxPitch, lastpitch);
    previousPitches.reverse();
    previousPitches.pop();
    previousPitches.reverse();
    pitch = keepTema( tema, possiblePitches, previousPitches);
    pitchlist.push(pitch);
    previousPitches.push(pitch);
    noNotes = noNotes-1;
    rotate(tema);
  }
  return pitchlist;
}

// rotate-ar array ex. [0,1,2] --> [1,2,0]
function rotate(tema) {
  const temp = tema[0];
  for (i = 1; i < tema.length ; i++){
    const tmp = tema[i -1];
    tema[i-1] = tema[i]
  }
  tema[tema.length - 1]  = temp;
}

// Býr til valid pitch sem að uppfyllir öll skilyrði
function createValidPitch(scale, intervalRules, minPitch, maxPitch, lastpitch){
  let pitch = random(minPitch, maxPitch);
  while(!
    (isMember((pitch%12), scale) && isMember(Math.abs(pitch - lastpitch),intervalRules))){
    pitch = random(minPitch, maxPitch);
  }
  return pitch;
}

// Býr til nokkur random start pitches svo að hægt sé að byrja að búa til pitches til þess að bera saman við tema og bæta við lagið
function createValidStartPitches(noNotes, scale, intervalRules, minPitch, maxPitch){
  let pitches = [];
  let lastpitch = random(minPitch, maxPitch);
  while (!(isMember((lastpitch%12), scale))){
    lastpitch = random(minPitch, maxPitch);
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
    if(
      (isMember((testPitch%12), scale)) && ((testPitch >= minPitch) && (testPitch <= maxPitch))
    ) validPitches.push(testPitch);
    testPitch = lastpitch + interval;
    if(
      (isMember((testPitch%12), scale)) && ((testPitch >= minPitch) && (testPitch <= maxPitch))
    ) validPitches.push(testPitch);
  });
  removeDuplicates(validPitches);
  return validPitches;
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
function isMember(value, arr){
  for(let i = 0; i < arr.length; i++){
    if (arr[i] === value) return true;
  }
  return false;
}

//tema föll

// rennur í gegnum allar mögulegar nótur og skilar þeirri sem að er líkust þemanum
function keepTema(tema, possiblePitches, previousPitches){
  let chances = [];
  for (let i = 0; i < possiblePitches.length; i++){
    let notes = previousPitches;
    notes.push(possiblePitches[i]);
    chances.push(temaChecker(tema, notes));
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
function temaChecker( temalist, notelist){
  const tema = makeIntervalArray(temalist);
  const notes = makeIntervalArray(notelist);
  const intervals = intervalValue(tema, notes);
  const intervalPositions = intervalPositionsValue(tema, notes);
  const intervalDirection = intervalDirectionValue(tema, notes);
  const relation = relationValue(tema, notes);
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

// skilar gildi frá 0-1 tema eftir því hversu mörg tónbil eru eins
function intervalValue( tema, notes ){
  let count = 0;
  for (let i = 0; i < notes.length; i++){
    if(isMember(notes[i],tema)) count++;
  }
  return count/tema.length;
}

// skilar gildi frá 0-1 tema eftir því hversu mörg tónbil eru eins á sama stað
function intervalPositionsValue(tema, notes){
  let count = 0;
  for (let i = 0; i < notes.length; i++){
    if(Math.abs(notes[i]) === Math.abs(tema[i])) count++;
  }
  return count/tema.length;
}

// skilar gildi frá 0-1 tema eftir því hversu mörg tónbilana séu með sömu stefnu
function intervalDirectionValue(tema, notes){
  let count = 0;
  for (let i = 0; i < notes.length; i++){
    if(((isMinus(notes[i])&&isMinus(tema[i]))||(isPlus(notes[i])&&isPlus(tema[i])))) count++;
  }
  return count/tema.length;
}

// skilar true ef tala er neikvæð
function isMinus(val){
  if (val < 0) return true;
  return false;
}

// skilar true ef tala er jákvæð
function isPlus(val){
  if (val > 0) return true;
  return false;
}

//skilar gildi frá 0-1 eftir skyldleika
function relationValue (tema, notes){
  let count = 0;
  for(let i = 0; i < notes.length; i++){
    if (notes[i] + tema[i] === 12) count++;
  }
  return count/tema.length;
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

function random(min, max){
  const rand = (Math.round(Math.random() * (max - min))) + min;
  return rand;
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

// Býr til attack lista sem að segir til um hvenær á að spila nótu
function createAttackList(noNotes, tema, attackMatrix){
  return markovChain(tema, attackMatrix, noNotes);
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

let pList = createPitchList(120, [9, 11, 4, 2, 7, 7, 7, 9, 11, 5],[0,2,4,5,7,9,11], [0,1,2,4,6,8],30,90 );
let aList = createAttackList (120, [64, 96], [[0.75, 0.25],[0.75, 0.25]]);
let dList = createDurationList(aList, 0.9);
let vList = createVelocityList(120,127);
let cList = createChannelsList(120,0);
const masterList = {pitchList: pList, attackList: aList, durationList: dList, velocityList: vList, channelsList: cList};
