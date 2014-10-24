/** @jsx React.DOM */
var VotingApp = require("./voting-app");

var appNode = document.getElementById("app");
React.renderComponent(<VotingApp />, appNode);