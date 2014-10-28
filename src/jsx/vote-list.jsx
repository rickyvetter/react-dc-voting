/** @jsx React.DOM */
var VoteListItem = require("./vote-list-item");

var VoteList = module.exports = React.createClass({
	render: function(){
		var items = [];
		console.log(this.props.items);
		this.props.items.forEach(function(item){
			items.push(
				<VoteListItem
					votes={item.votes}
					title={item.name}
					description={item.description}
					callForUpdate={this.props.callForUpdate}/>
			);
		}, this);
		return (
			<ul>
				{items}
			</ul>
		);
	}
});