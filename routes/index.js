var ItemsModel = require("../models/item");

module.exports = function (app) {
	/** routes */
	app.get("", loadApp);
	app.get("/items", getItemList);
	app.get("/items/:id", getItem);
	app.post("/items", createItem);
	app.post("/items/:id", updateItem);

	/** actions */
	function* loadApp(){		
		yield this.render("app");
	}

	function* getItemList(){
		try{
			var itemList = yield ItemsModel(this.db).readList(this.query.itemCount);
			this.body = itemList;
		}
		catch(err){
			handleError(this, err);
		}
	}

	function* getItem(){
		try{
			var item = yield ItemsModel(this.db).read(this.params.id);
			this.body = item;
		}
		catch(err){
			handleError(this, err);
		}
	}

	function* createItem(){
		try{
			var item = this.request.body;
			var createdItem = yield ItemsModel(this.db).create(item);
			
			this.body = createdItem;
		}
		catch(err){
			handleError(this, err);
		}
	}

	function* updateItem(){
		try{
			var item = this.request.body;
			var updatedItem = yield ItemsModel(this.db).update(this.params.id, item);
			
			this.body = updatedItem;
		}
		catch(err){
			handleError(this, err);
		}
	}

	function handleError(ctx, err){
		ctx.body = {
			error: "Internal"
		}
		ctx.statusCode = 500;
		//console.log(err, err.stack);
		throw err;
	}
};