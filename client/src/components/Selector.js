var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Selector = React.createClass({
  render: function () {
    return (
      <div className='radio'>
        <label className="radio-inline" input type="radio">Option 1</label>
        <label className="radio-inline" input type="radio">Option 2</label>
        <Link to='/playMusic'>
          <button type='button' className='btn btn-lg btn-success'>Make music</button>
        </Link>
      </div>
    )
  }
});

module.exports = Selector;
