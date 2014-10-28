xhr = require("xhr");

window.dataController = module.exports = {
	getList: function(startID, itemCount, cb){
		var opts = {
			method: "GET",
			url: "/items"
		};
		if(startID){
			opts.url += "?startID="+startID;
		}
		if(itemCount){
			startID ?
				opts.url += "&itemCount=" + itemCount :
				opts.url += "?itemCount=" + itemCount;
		}
		var errorMessage = "There was an error reading the list of votes.";
		this._xhr(opts, errorMessage, cb);
	},
	create: function(data, cb){
		var opts = {
			method: "POST",
			json: data,
			url: "/items"
		};
		var errorMessage = "There was an error creating an item.";
		this._xhr(opts, errorMessage, cb);
	},
	get: function(id, cb){
		var opts = {
			method: "GET",
			url: "/items/" + id
		};
		var errorMessage = "There was an error reading an item.";
		this._xhr(opts, errorMessage, cb);
	},
	update: function(data, cb){
		var opts = {
			method: "POST",
			json: data,
			url: "/items/" + data.id
		};
		var errorMessage = "There was an error updating an item.";
		this._xhr(opts, errorMessage, cb);
	},
	_xhr: function(opts, errorMessage, cb){
		xhr(opts, function(err, resp, body){
			if(err){
				console.error(errorMessage, err);
			}
			cb(err, resp, body);
		});
	}
}