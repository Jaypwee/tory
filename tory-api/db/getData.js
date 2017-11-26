"use strict"; 

module.exports = function(obj){
    const db = obj.db, 
          server = obj.server

    const itemgroup = db.collection('Itemgroup');
    const items = db.collection('Items');
    const contactlist = db.collection('Contactlist');
    const settings = db.collection('Settings');
    const test = db.collection('Test');
    const logs = db.collection('Logs');
    
    server.get('/itemgroup/get', (req, res, next) =>
{        itemgroup.find({}).toArray()
            .then(docs => res.send(200, docs))
            .catch(err => res.send(500, err))

        next()});
    server.get('/items/get', (req, res, next) => {
        items.find({}).toArray()
            .then(docs => res.send(200, docs))
            .catch(err => res.send(500, err))
    
        next()    });
    server.get('/contactlist/get',(req, res, next) => {
        contactlist.find({}).toArray()
            .then(docs => res.send(200, docs))
            .catch(err => res.send(500, err))
        next()
    });
    server.get('/settings/get', (req, res, next) =>{
        settings.find({}).toArray()
            .then(docs => res.send(200, docs))
            .catch(err => res.send(500, err))
        next()
    })
    server.get('/logs/get', (req, res, next) =>{
        logs.find({}).toArray()
            .then(docs => res.send(200, docs))
            .catch(err => res.send(500, err))
        next()
    })
}


//     that.getAll = function(req, res, next){
//         (db, callback) => {
//             var collection = db.collection('Items');
//             collection.find({}).toArray(function(err, docs){
//                 assert.equal(err,null);
//                 res.send(docs);
//             }); 
//     };
    
//     that.getItem = function(req,res,next){
//         (db, callback) => {
//             var collection = db.collection('Items');
//             collection.find({}).toArray(function(err, docs){
//                 assert.equal(err,null);
//                 res.send(docs);
//             }); 
//     };

//     that.getContact = function(req,res,next){
//         (db, callback) => {
//             var collection = db.collection('Contactlist');
//             collection.find({}).toArray(function(err, docs){
//                 assert.equal(err,null);
//                 res.send(docs);
//             }); 
//     };

// }