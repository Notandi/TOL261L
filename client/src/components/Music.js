import React from 'react';
var PropTypes = React.PropTypes;
import EventListener from 'react-event-listener';

function Music (props) {
  return (
    <div>


      <EventListener
          target="window"
          onKeyDown={(e) => props.onPlayNote(e)}
          onKeyUp={(e) => props.onReleaseNote(e)}
        />
        <div className="textplacer">
        <button type='button' className='btn btn-lg btn-success' onClick={props.onPlayMusic}> play Music</button>

          <h1>Keyboard</h1>
          <p>use "a s d f g h j" to play the white keys and  "w e t y u" to play the black keys</p>
          <p>use "q" to go down an octave and "i" to go up an octave</p>
        </div>
        <div className="pianoplacer">
  	    	<div className="piano">
  	    		<div className="effects">
              <p className="octave"> oct </p>
              <p className="octaveNumber">{props.keyboardState.octave}</p>
  	    		</div>
  	    		<div className="keys">
  	    			<div className={'key '+ props.keyboardState.key1}></div>
  	    			<div className={'black-key '+ props.keyboardState.key2}></div>
  	    			<div className={'key '+ props.keyboardState.key3}></div>
              <div className={'black-key '+ props.keyboardState.key4}></div>
  	    			<div className={'key '+ props.keyboardState.key5}></div>
  	    			<div className={'key '+ props.keyboardState.key6}></div>
              <div className={'black-key '+ props.keyboardState.key7}></div>
  	    			<div className={'key '+ props.keyboardState.key8}></div>
              <div className={'black-key '+ props.keyboardState.key9}></div>
  	    			<div className={'key '+ props.keyboardState.key10}></div>
              <div className={'black-key '+ props.keyboardState.key11}></div>
  	    			<div className={'key '+ props.keyboardState.key12}></div>
  	    		</div>
  	    	</div>
      	</div>

        <div className="waveplacer">
          <div className="arrowLeft" onClick={props.setWaveFormLeft}></div>
          <p className="waves">{props.keyboardState.waveForm}</p>
          <div className="arrowRight" onClick={props.setWaveFormRight}></div>
        </div>
    </div>
  )
}

Music.propTypes = {
  onPlayMusic: PropTypes.func.isRequired,
  onPlayNote: PropTypes.func.isRequired,
  onReleaseNote: PropTypes.func.isRequired,
  keyboardState: PropTypes.object.isRequired,
  setWaveFormRight: PropTypes.func.isRequired,
  setWaveFormLeft: PropTypes.func.isRequired,
}

module.exports = Music;
