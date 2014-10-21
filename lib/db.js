var mysql = require("mysql");

module.exports = function(config){
    var sqlPool = mysql.createPool(config);
    
    sqlPool.on("connection", function(conn) {
        conn.on("error", function(err) { }); //do we want to do something with this?
    });

    return {
        getConnection: function(cb){

            sqlPool.getConnection(function(err, conn) {
                if (err) {
                    cb(err);
                }
                else{
                    // Somewhat crudely ensure that a connection is present: ping the server
                    // and reconnect if the error is caused by disconnection
                    conn.ping(function(err, result) {
                        if (err && err.code != 'PROTOCOL_CONNECTION_LOST') {
                            cb(err);
                        }
                        else if (err && err.code == 'PROTOCOL_CONNECTION_LOST') {
                            debug("db reconnect! due to:", err);
                            conn.connect(function(err){
                                cb(err, conn);
                            });
                        }
                        else{
                            cb(null, conn);
                        }
                    });
                }
            });
        },
        releaseConnection: function(conn){
            conn.release();
        }
    }
}

