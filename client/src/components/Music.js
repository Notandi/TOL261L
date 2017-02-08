var React = require('react');
var PropTypes = React.PropTypes;

function Music (props) {
  return (
    <div>
      <button type='button' className='btn btn-lg btn-success' onClick={props.onPlayMusic}> play Music</button>
    </div>
  )
}

Music.propTypes = {
  onPlayMusic: PropTypes.func.isRequired,
}

module.exports = Music;
