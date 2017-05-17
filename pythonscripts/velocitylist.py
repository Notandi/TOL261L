import numpy as np

def velocityList (noNotes, intensity):
    velocity = np.array([])
    for num in range (0, noNotes):
        velocity = np.append(velocity, np.array([intensity]))
    output = velocity.tolist()
    return output
