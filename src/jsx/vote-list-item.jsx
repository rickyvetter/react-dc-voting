/** @jsx React.DOM */

var VoteItem = module.exports = React.createClass({
	vote: function(){
		dataController.update({
			id:this.props.id,
			name:this.props.title,
			description:this.props.description,
			votes:this.props.votes + 1
		}, this.props.callForUpdate);
	},
	render: function(){
		return (
			<div>
				<div className="votes" onClick={this.vote}>{this.props.votes}</div>
				<div className="title">{this.props.title}</div>
				<div className="description">{this.props.description}</div>
			</div>
		)
	}
});