/** @jsx React.DOM */
var VotingApp = require("./voting-app");

var appNode = document.getElementById("app");

var renderApp = function(error, data){
	var items = JSON.parse(data.response);
	React.renderComponent(<VotingApp items={items} callForUpdate={callForUpdate}/>, appNode);
}

callForUpdate = function(error, data){
	dataController.getList(1, 100, renderApp);
}

dataController.getList(1, 100, renderApp);