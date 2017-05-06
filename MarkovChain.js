// skilar 107x107 markovkeðju þarf að bæta við 12 á allar niðurstöður til að fá rétt gildi í midi
const distribution = [0.35,0.13,0.13,0.065,0.065,0.13,0.13];
const modifierDistribution = [0.025,0.05,0.1,0.15,0.35,0.15,0.1,0.05,0.025];

function createNewMarkovChain(scale){
  let markovChain = [];
  let markovSize = 108;
  let zeroArray = createZeroArray(markovSize);
  let modifier = createMarkovScaleModifier(scale,markovSize);
  /*
  for (let i = 0; i < markovSize; i++){
    if(isModOf(i,scale)){
      markovChain[i] = createMarkovRow(i,markovSize,modifier);
    } else {
      markovChain[i] = zeroArray;
    }
  }*/
  for (let i = 0; i < markovSize; i++){
    if (isModOf(i,scale)){
      markovChain[i] = modifier;
    }else {
      markovChain[i] = zeroArray;
    }
  }
  let count = 0;
  for (let i = 0; i < modifier.length; i++){
    count += modifier[i];
  }
  return markovChain;
}

function createMarkovScaleModifier(scale,length){
  let scaleModifier = [];
  for(let i = 0 ; i < 9; i++){
    let octaveChain = generateScaleDistrubution(scale,modifierDistribution[i]);
    scaleModifier = scaleModifier.concat(octaveChain);
  }
  return scaleModifier;
}

function generateScaleDistrubution (scale, modifier){
  let octaveLenght = 12;
  let octaveArray = createZeroArray(12);
  for(let i = 0; i < scale.length; i++){
    let num = scale[i];
    let chance = distribution[i] * modifier;
    chance = (parseFloat(parseFloat(chance).toPrecision(15)))
    octaveArray[num] = chance;
  }
  return octaveArray;
}

function createMarkovRow(num, lenght, modifier){
  let markovRow = [];
  for (let i = 0; i < length; i++){

  }
}

/*function createMarkovRow(num, length, modifier){
  let markovRow = [];
  for (let i = 0; i < length;i++){
    markovRow[i] = ;
  }
}*/

function createZeroArray(length){
  let zeroArray = [];
  for(let i = 0; i < length; i++){
    zeroArray[i] = 0;
  }
  return zeroArray;
}

function isModOf(num, scale){
  for(let i = 0; i < scale.length;i++){
    if (num%12 === scale[i]) return true;
  }
  return false;
}

var MarkovChain = function (){

  let mchain = createNewMarkovChain([8,10,11,1,3,4,6]);
  return mchain;

}



module.exports = MarkovChain;
