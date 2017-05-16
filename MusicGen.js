// gefur random tölu á milli min og max
function random(min, max){
  const rand = (Math.round(Math.random() * (max - min))) + min;
  return rand;
}

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
  let aList = createAttackList (120, [64, 96], [[0.75, 0.25],[0.75, 0.25]]);
  let dList = createDurationList(aList, 0.9);
  let vList = createVelocityList(120,127);
  let cList = createChannelsList(120,0);
  const masterList = {attackList: aList, durationList: dList, velocityList: vList, channelsList: cList};
  return masterList;
}

module.exports = MusicGen;
