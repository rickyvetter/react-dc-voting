var koa = require("koa");
var router = require("koa-router");
var koaBody = require("koa-body");
var path = require("path");
var MysqlPool = require("./lib/db");
var thunkify = require("thunkify")

process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.PORT || (process.env.PORT = 3000);

var koa = require("koa");

var app = koa();

var db = {
  host: "127.0.0.1",
  database: "react-dc-voting",
  user: "root",
  password: "",
  connectionLimit: 100
}

var pool = MysqlPool(db);
var getConnection = thunkify(pool.getConnection);

app.use(function*(next){
  var conn = yield getConnection();
  var thunkQuery = thunkify(conn.query.bind(conn));
  this.db = {
    query: thunkQuery
  }
  yield next;
  pool.releaseConnection(conn);
});

/* body parsing */

app.use(koaBody());

/** Middleware */
app.use(router(app));

/* render engine */

var render = require("koa-ejs");
render(app, {
  root: path.join(__dirname, "views"),
  viewExt: "ejs",
  layout: null,
  cache: false,
  debug: false,
});

/* routes */

var router = require("koa-router");
app.use(router(app));

require("./routes")(app);

/* Sets up static files */

var serve = require("koa-static");
app.use(serve("./public"));

app.listen(process.env.PORT, function(){
	console.log("Listening in %s mode on port %s", process.env.NODE_ENV, process.env.PORT);
});
