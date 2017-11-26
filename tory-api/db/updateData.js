"use strict";

module.exports = function(obj){
    const db = obj.db, 
          server = obj.server

    const itemgroup = db.collection('Itemgroup');
    const items = db.collection('Items');
    const contactlist = db.collection('Contactlist');
    const settings = db.collection("Settings");


    server.put('/settings/update', (req, res, next) =>  {
        const data = JSON.parse(req.body)
        settings.update({name: "overview"}, data)
            .then(res.send(204))
            .catch((err)=>res.send(500, err))
        next();
        
    }) 
    server.put('/items/add', (req, res, next) => {
        const data = JSON.parse(req.body)
        let query = {name: data.name}
        console.log(query)
        items.update(query, data, {upsert: true})
            .then(res.send(200))
            .catch((err)=>res.send(500, err))
        next();
    })
}