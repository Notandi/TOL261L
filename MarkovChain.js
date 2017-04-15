// skilar 107x107 markovkeðju þarf að bæta við 12 á allar niðurstöður til að fá rétt gildi í midi
function createNewMarkovChain(scale){
  let markovChain = [];
  let markovSize = 107;
  let zeroArray = createZeroArray(markovSize);
  let modifier = createMarkovScaleModifier(scale,markovSize);

  for (let i = 0; i < markovSize; i++){
    if(isModOf(i,scale)){
      markovChain[i] = createMarkovRow(i,markovSize,modifier);
    } else {
      markovChain[i] = zeroArray;
    }
  }
  return markovChain;
}

function createMarkovScaleModifier(scale,length){

}

function generateOctaveDistrubution (scale){
  for (let i = 0; i < 12; i++){
    
  }
}

function createMarkovRow(num, length, modifier){
  let markovRow = [];
  for (let i = 0; i < length;i++){
    markovRow[i] = ;
  }
}

function createZeroArray(length){
  let zeroArray = [];
  for(let i = 0; i < length; i++){
    zeroArray[i] = 0;
  }
  return zeroArray;
}

function isModOf(num, scale){
  for(let i = 0; i < scale.length;i++){
    if (num%scale[i] === 0) return true;
  }
  return false;
}
