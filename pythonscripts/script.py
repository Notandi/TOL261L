import numpy as np
import json
import random
import sys

# tekur á móti gögnum frá server
lister  = json.load(sys.stdin)
scaleArray = np.array(lister['scale'])
distribution = np.array(lister['distribution'])
modifierDistribution = np.array(lister['modifierDistribution'])

## svo að array verður prentaður út í einni línu
np.set_printoptions(threshold=np.inf)

# býr til markovkeðjuna með því að gera matrixu
def createNewMarkovChain (scale):
    markovSize = 108
    modifier = createMarkovScaleModifier(scale,markovSize, 0)

    if isModOf(0,scale):
        markovChain = np.array([modifier])
    else:
        markovChain = np.array([np.zeros(markovSize)])

    for num in range(1,markovSize):
        if isModOf(num,scale):
            markovChain = np.concatenate((markovChain, np.array([createMarkovScaleModifier(scale,markovSize, num%12)])), axis= 0)
        else:
            markovChain = np.concatenate((markovChain, np.array([np.zeros(markovSize)])), axis= 0)
    return markovChain

# býr til líkindadreifinug fyrir hvert einasta pitch
def createMarkovScaleModifier (scale, length, position):
    scaleModifier = np.array([])
    for num in range(0,9):
        octaveChain = generateScaleDistrubution(scale, (modifierDistribution[num] + np.roll(modifierDistribution, position - 4)[num] )/2 )
        scaleModifier = np.concatenate((scaleModifier,octaveChain), axis = 0)
    return scaleModifier

# býr til líkindadreifinug fyrir hverja áttund í hverju pitch
def generateScaleDistrubution (scale, modifier):
    octaveSteps = 12
    octaveArray = np.zeros(octaveSteps)
    for num in range(0,scale.size):
        pitch = scale[num]
        chance = distribution[num] * modifier
        octaveArray[pitch] = chance
    return octaveArray

# Gáir hvort að pitch sé til í scale
def isModOf (pitch, scale):
    for num in range(0, scale.size):
        if (pitch%12 == scale[num]):
             return True
    return False

#vinna úr markov keðju
def pitchList(mchain, startPitch, numberOfPitches):
    rand = random.uniform(0,1)
    sum = 0
    list = mchain[startPitch]
    if (numberOfPitches <= 1 ):
        for num in range(0, list.size):
          sum = sum + list[num]
          if (rand < sum):
              return np.array([num])
    else:
        for num in range(0, list.size):
            sum = sum + list[num]
            if (rand < sum):
                return np.concatenate((np.array([num]), pitchList(mchain, num, numberOfPitches - 1)),axis = 0)

# býr til markovkeðju útfrá skala
mchain = createNewMarkovChain(scaleArray)

# býr til pitchlista útfrá markovkeðju
plist = pitchList(mchain,scaleArray[0],55)


# breytir listanum þannig að það sé hægt að skila honum á þæginlegu formi
output = plist.tolist()
print (json.dumps({'pitchlist': output}))
