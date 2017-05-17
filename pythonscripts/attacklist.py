import numpy as np
import random

def createAttackList (noNotes, values, markovChain, startBeat):
    rand = random.uniform(0,1)
    sum = 0
    list = markovChain[startBeat]
    if (noNotes <= 1 ):
        for num in range(0, list.size):
          sum = sum + list[num]
          if (rand < sum):
              return np.array([num])
    else:
        for num in range(0, list.size):
            sum = sum + list[num]
            if (rand < sum):
                return np.concatenate((np.array([values[num]]), createAttackList(noNotes -1, values, markovChain, startBeat)),axis = 0)


def attackList (noNotes, values, markovChain):
    alist = createAttackList(noNotes, values, markovChain, 0)
    output = alist.tolist()
    return output
