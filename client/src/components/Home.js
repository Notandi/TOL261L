var React = require('react');
var PropTypes = React.PropTypes;
var ReactRouter = require('react-router');

function Home (props) {
  return (
    <div>
      <div className='jumbotron col-sm-12 text-center'>
        <h1>Music</h1>
        <p>This is a site which plays music. Using a mathematical model based on music theory</p>
      </div>
        <div className="placer">
          <p>Length</p>
        </div>
        <div className="placer">
          <div className="arrowLeft" onClick={props.setLengthLeft}></div>
          <p className="placerText">{props.state.songlength}</p>
          <div className="arrowRight" onClick={props.setLengthRight}></div>
        </div>
        <div className="placer">
          <p>Rythm</p>
        </div>
        <div className="placer">
          <div className="arrowLeft" onClick={props.setRythmLeft}></div>
          <p className="placerText">{props.state.rythm}</p>
          <div className="arrowRight" onClick={props.setRythmRight}></div>
        </div>
        <div className="placer">
          <p>Scale</p>
        </div>
        <div className="placer">
          <div className="arrowLeft" onClick={props.setScaleLeft}></div>
          <p className="placerText">{props.state.scale}</p>
          <div className="arrowRight" onClick={props.setScaleRight}></div>
        </div>
        <div className="placer">
          <p>Distribution</p>
        </div>
        <div className="placer">
          <div className="arrowLeft" onClick={props.setDistributionLeft}></div>
          <p className="placerText">{props.state.distribution}</p>
          <div className="arrowRight" onClick={props.setDistributionRight}></div>
        </div>
        <button type='button' className='btn btn-lg btn-success' onClick={props.onGenerateMusic}>Make music</button>

    </div>
  )
}


Home.propTypes = {
  state: PropTypes.object.isRequired,
  setLengthRight : PropTypes.func.isRequired,
  setLengthLeft : PropTypes.func.isRequired,
  setRythmRight : PropTypes.func.isRequired,
  setRythmLeft : PropTypes.func.isRequired,
  setScaleRight : PropTypes.func.isRequired,
  setScaleLeft : PropTypes.func.isRequired,
  setDistributionRight : PropTypes.func.isRequired,
  setDistributionLeft : PropTypes.func.isRequired,
  onGenerateMusic : PropTypes.func.isRequired,
}


module.exports = Home;
