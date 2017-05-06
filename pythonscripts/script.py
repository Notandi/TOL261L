import numpy as np

distribution = np.array([0.35,0.13,0.13,0.065,0.065,0.13,0.13])
modifierDistribution = np.array([0.025,0.05,0.1,0.15,0.35,0.15,0.1,0.05,0.025])

# býr til markovkeðjuna með því að gera matrixu
def createNewMarkovChain (scale):
    markovSize = 108
    modifier = createMarkovScaleModifier(scale,markovSize)

    if isModOf(0,scale):
        markovChain = np.array([modifier])
    else:
        markovChain = np.array([np.zeros(markovSize)])

    for num in range(1,markovSize):
        if isModOf(num,scale):
            markovChain = np.concatenate((markovChain, np.array([modifier])), axis= 0)
        else:
            markovChain = np.concatenate((markovChain, np.array([np.zeros(markovSize)])), axis= 0)
    return markovChain

def createMarkovScaleModifier (scale, length):
    scaleModifier = np.array([])
    for num in range(0,9):
        octaveChain = generateScaleDistrubution(scale, modifierDistribution[num])
        scaleModifier = np.concatenate((scaleModifier,octaveChain), axis = 0)
    return scaleModifier

def generateScaleDistrubution (scale, modifier):
    octaveSteps = 12
    octaveArray = np.zeros(octaveSteps)
    for num in range(0,scale.size):
        pitch = scale[num]
        chance = distribution[num] * modifier
        octaveArray[pitch] = chance
    return octaveArray


def isModOf (pitch, scale):
    for num in range(0, scale.size):
        if (pitch%12 == scale[num]):
             return True
    return False

mchain = createNewMarkovChain(np.array([8,10,11,1,3,4,6]));
