export * from './itemActions';
export * from './SettingsActions';
export * from './IGActions';
export * from './contactlistActions';
export * from './logActions';

export function initialize(){
    return function(dispatch){
        Promise.all([
            fetch("/items/get"),
            fetch("/contactlist/get"),
            fetch("/itemgroup/get"),
            fetch("/settings/get"),
            fetch("/logs/get"),
            console.log("TEST?")
        ])
        .then(([items, contactlist, itemgroup, settings, logs]) => 
            Promise.all([
                items.json(),
                contactlist.json(), 
                itemgroup.json(), 
                settings.json(), 
                logs.json()
            ])
        .then(([itemdata, contactdata, itemgroupdata, settingsdata, logdata]) =>{
            console.log("INITIALIZING")
            dispatch({type: "FETCH_ITEMS_FULFILLED", payload: itemdata})
            dispatch({type: "FETCH_IG_FULFILLED", payload: itemgroupdata})
            dispatch({type: "FETCH_SET_FULFILLED", payload: settingsdata})
            dispatch({type: "FETCH_CL_FULFILLED", payload: contactdata})
            dispatch({type: "FETCH_LOG_FULFILLED", payload: logdata})
        }))
        .catch((err)=>{
            console.log(err);
        })
    }
}
