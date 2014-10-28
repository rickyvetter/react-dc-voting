module.exports = function(db){
	return {
		create: function *(data){
			var sql = "INSERT INTO items SET ?";
			var res = yield db.query(sql, [data]);
			return res.insertId;
		},
		read: function* (id){
			var itemsData = yield db.query("SELECT * FROM items WHERE id = ?", [id]);
			var items = itemsData[0] || [];
			if(items.length!=1){
				console.log(items, items.length);
				throw new Error("Invalid item id");
			}
			else{
				return items[0];
			}
		},
		readList: function* (itemCount){
			// TODO: add ability to set start point
			var items = yield db.query("SELECT * FROM items ORDER BY votes DESC LIMIT ?", [parseInt(itemCount)]);
			return items[0];
		},
		update:function *(id,data){
			var sql = "UPDATE items SET ? WHERE id = ?";
			yield db.query(sql,[data,id]);
		}
	}
}
