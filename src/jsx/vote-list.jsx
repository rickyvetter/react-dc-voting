/** @jsx React.DOM */
var VoteListItem = require("./vote-list-item");

var VoteList = module.exports = React.createClass({
	addItem: function(){
		var title = window.prompt("Title", "");
		var description = window.prompt("description", "");
		dataController.create({
			name:title,
			description:description,
			votes:0
		}, this.props.callForUpdate);
	},
	render: function(){
		var items = [];
		console.log(this.props.items);
		this.props.items.forEach(function(item){
			items.push(
				<VoteListItem
					id={item.id}
					votes={item.votes}
					title={item.name}
					description={item.description}
					callForUpdate={this.props.callForUpdate}/>
			);
		}, this);
		return (
			<div>
				<ul>
					{items}
				</ul>
				<div className="add-item" onClick={this.addItem}>Add Item</div>
			</div>
		);
	}
});