import numpy as np
import json
import sys
import pitchlist as pl
import attacklist as al
import durationlist as dl
import velocitylist as vl
#mögulega bæta við channels í framtíðinni

# tekur á móti gögnum frá server
lister  = json.load(sys.stdin)
scaleArray = np.array(lister['scale'])
distribution = np.array(lister['distribution'])
modifierDistribution = np.array(lister['modifierDistribution'])
noNotes = lister['noNotes']
intensity = lister['intensity']
duration = lister['duration']
ticks = np.array(lister['ticks'])
markov = np.array(lister['markov'])

## svo að json response verði skrifað út í einni línu
np.set_printoptions(threshold=np.inf)

attacklist = al.attackList(noNotes, ticks, markov)
durationlist = dl.durationList(attacklist, duration)
velocitylist = vl.velocityList(noNotes, intensity)
pitchlist = pl.pitchList(noNotes, scaleArray, distribution, modifierDistribution)


print (json.dumps({'pitchlist': pitchlist, 'attacklist': attacklist, 'durationlist': durationlist, 'velocitylist': velocitylist}))
