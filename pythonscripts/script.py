import numpy as np
import json
import sys
import pitchlist as pl
import attacklist as al
import durationlist as dl
#mögulega bæta við channels í framtíðinni

# tekur á móti gögnum frá server
lister  = json.load(sys.stdin)
scaleArray = np.array(lister['scale'])
distribution = np.array(lister['distribution'])
modifierDistribution = np.array(lister['modifierDistribution'])

## svo að array verður prentaður út í einni línu
np.set_printoptions(threshold=np.inf)

# býr til markovkeðjuna með því að gera matrixu
pitchlist = pl.pitchList(scaleArray, distribution, modifierDistribution)
print (json.dumps({'pitchlist': pitchlist}))
