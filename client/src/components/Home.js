var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Home = React.createClass({
  render: function () {
    return (
      <div className='jumbotron col-sm-12 text-center'>
        <h1>Music</h1>
        <p className='lead'> some fancy motto </p>
        <Link to='/selector'>
          <button type='button' className='btn btn-lg btn-success'>Make music</button>
        </Link>
        <p>This is a site which plays music. Using a mathematical model based on music theory</p>
      </div>
    )
  }
});

module.exports = Home;
