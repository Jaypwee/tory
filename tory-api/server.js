"use strict";

var restify = require('restify'),
    client = require('./db/index'),
    mongodb = require('mongodb').MongoClient,
    getData = require('./db/getData'),
    postData = require('./db/postData')

var server = restify.createServer({
    name: client.name,
    version: client.version
});

server.use(restify.plugins.jsonBodyParser({ mapParams: true }))
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser({mapParams: true}));
server.use(restify.plugins.fullResponse())

server.listen(client.port, () => {
    mongodb.connect(client.db.uri, (err, db) => {
    if (err) {
        console.log('An error occurred while attempting to connect to MongoDB', err)
        process.exit(1)
    }

    //Need first-time initialization code

    console.log(
        '%s v%s ready to accept connections on port %s in %s environment.',
        server.name,
        client.version,
        client.port,
        client.env
    )
    require('./db/getData')({ db, server })
    require('./db/postData')({ db, server })
    require('./db/updateData')({ db, server })
    
    })
    console.log('listenin... as ', client.port);
}); 
