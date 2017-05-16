import numpy as np
import random

# býr til markovkeðjuna með því að gera matrixu
def createNewMarkovChain (scale, modifierDistribution, distribution):
    markovSize = 108
    modifier = createMarkovScaleModifier(scale,markovSize, 0, modifierDistribution, distribution)

    if isModOf(0,scale):
        markovChain = np.array([modifier])
    else:
        markovChain = np.array([np.zeros(markovSize)])

    for num in range(1,markovSize):
        if isModOf(num,scale):
            markovChain = np.concatenate((markovChain, np.array([createMarkovScaleModifier(scale,markovSize, num%12, modifierDistribution, distribution)])), axis= 0)
        else:
            markovChain = np.concatenate((markovChain, np.array([np.zeros(markovSize)])), axis= 0)
    return markovChain

# býr til líkindadreifinug fyrir hvert einasta pitch
def createMarkovScaleModifier (scale, length, position, modifierDistribution, distribution):
    scaleModifier = np.array([])
    for num in range(0,9):
        octaveChain = generateScaleDistrubution(scale, distribution, (modifierDistribution[num] + np.roll(modifierDistribution, position - 4)[num] )/2 )
        scaleModifier = np.concatenate((scaleModifier,octaveChain), axis = 0)
    return scaleModifier

# býr til líkindadreifinug fyrir hverja áttund í hverju pitch
def generateScaleDistrubution (scale, distribution, modifier):
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
def createPitchList(mchain, startPitch, numberOfPitches):
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
                return np.concatenate((np.array([num]), createPitchList(mchain, num, numberOfPitches - 1)),axis = 0)

def pitchList(scaleArray, distribution, modifierDistribution):
    # býr til markovkeðju útfrá skala
    mchain = createNewMarkovChain(scaleArray, modifierDistribution, distribution)
    # býr til pitchlista útfrá markovkeðju
    plist = createPitchList(mchain, scaleArray[0], 120)
    # breytir listanum þannig að það sé hægt að skila honum á þæginlegu formi
    output = plist.tolist()
    return output
