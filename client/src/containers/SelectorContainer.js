var React = require('react');
var Selector = require('../components/Selector');


var SelectorContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  render: function () {
    return (
      <Selector/>
    )
  }
})

module.exports = SelectorContainer;
