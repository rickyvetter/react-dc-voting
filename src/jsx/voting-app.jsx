/** @jsx React.DOM */
var VoteList = require("./vote-list");

var votingApp = module.exports = React.createClass({
	render: function(){
		return (
			<VoteList items={this.props.items} callForUpdate={this.props.callForUpdate}/>
		)
	}
});