/** @jsx React.DOM */
var VoteList = require("./vote-list");

var votingApp = module.exports = React.createClass({
	render: function(){
		return (
			<div id="vote-app">
				<h1>React DC Discussion Submissions</h1>
				<VoteList items={this.props.items} callForUpdate={this.props.callForUpdate}/>
			</div>
		)
	}
});