import numpy as np

def durationList (attackDelta, ratio):
    attack = np.array(attackDelta)
    dlist = ratio * attack
    output = dlist.tolist()
    return output
