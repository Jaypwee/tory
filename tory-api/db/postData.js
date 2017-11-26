"use strict";

module.exports = function(obj){
    const db = obj.db, 
          server = obj.server

    const itemgroup = db.collection('Itemgroup');
    const items = db.collection('Items');
    const contactlist = db.collection('Contactlist');
    const logs = db.collection("Logs");

    server.post('/items/post', (req, res, next) =>  {
        const data = JSON.parse(data)
        items.insertOne(req.body)
        next()
    });   
    server.post('/contactlist/post', (req, res, next) => {
        const data = JSON.parse(req.body)
        contactlist.insertOne(data)
            .then(res.send(200))
        next()
    });
    server.post('/itemgroup/post', (req, res, next) => {
        const data = JSON.parse(req.body)
        itemgroup.insertOne(data)
            .then(res.send(200))
        next()
    });
    server.post('/logs/post', (req, res, next) => {
        const data = JSON.parse(req.body)
        logs.insertOne(data)
            .then(res.send(200))
        next()
    });
    
}

     
// function postDataControl(){
//     var that = this;
//     that.newContact = function(req,res,next){
//         const reqobj = JSON.parse(req.body);
//         console.log(reqobj);
//         const query =  {
//             name: 'post-contract',
//             text: 'insert into contactlist values($1, $2)',
//             values: [reqobj.name, reqobj.number]
//         };
//         client.query(query, (err, result)=>{
//             if(err){
//                 console.log(err.stack);
//                 return next(new NotFoundError('nothing'));
//             }else{
//                 console.log(result.rows);
//                 return next();
//             }
//             });
//         };

//     that.newIG = function(req,res,next){
//         const query = {
//             name: 'post-IG',
//             text: 'insert into itemgroup(name) values($1)',
//             values: [req.body.name]
//         }        
//         client.query(query, (err, result)=>{
//             if(err){
//                 console.log(err.stack);
//                 return next(new NotFoundError('nothing'));
//             }else{
//                 console.log(result.rows);
//                 return next();
//             }
//             });
//         };

//     that.newItem = function(req,res,next){
//         const reqobj = JSON.parse(req.body);
//         const query = {
//             name: 'post-item',
//             text: 'insert into items(name, size, contactname, contactnumber, itemgroup, entrydate, expiration) values($1, $2, $3, $4, $5, current_date, current_date + $6)', //입고날짜 수동설정 필요
//             values: [reqobj.name, parseInt(reqobj.size), reqobj.contactname, reqobj.contactnumber, reqobj.itemgroup, parseInt(reqobj.expiration)]
//         }
//         client.query(query, (err, result)=>{
//         if(err){
//             console.log(err.stack);
//             return next(new NotFoundError('nothing'));
//         }else{
//             console.log(result.rows);
//             return next();
//         }
//         });
//     }
// }

// module.exports = new postDataControl();