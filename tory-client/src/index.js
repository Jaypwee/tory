import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store'
import Overview from './overview.js';

// fetch("http://localhost:3000/items/get")
//     .then(function(response){
//             if (response.status !== 200){
//                 console.log('Error Status Code: ' + response.status);
//                 return;
//             }
//             response.json().then(
//                 function(data){
//                     ReactDOM.render(
//                         <Test items={data}/>,
//                         document.getElementById('overview')
//                     );}
//             );
//         })
//     .catch(function(err){console.log(err);});

// Promise.all([
//     fetch("/items/get"),
//     fetch("/contactlist/get"),
//     fetch("/itemgroup/get"),
//     fetch("/settings/get")
//     ]).then(([items, contactlist, itemgroup, settings]) => Promise.all([items.json(), contactlist.json(), itemgroup.json(), settings.json()])
//     .then(([itemdata, contactdata, itemgroupdata, settingsdata]) =>
//     {
//         console.log(settingsdata);
//         ReactDOM.render(
//             <Provider store={store} >
//                 <Overview items={itemdata} contactlist={contactdata} itemgroup={itemgroupdata} settings={settingsdata}/>
//             </Provider>,
//             document.getElementById('overview')
//         );
//     })).catch((err) => {
//         console.log(err);
//     })

ReactDOM.render(
    <Provider store={store} >
        <Overview/>
    </Provider>,
    document.getElementById('overview')
);