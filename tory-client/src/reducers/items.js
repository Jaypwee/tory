import _ from 'lodash';

export default function reducer(state={
    items: [],
    error: null,
    filtershow: -1,
    fetched: false,
    added: false,
    name: '', //From Here are states used when we are adding an item
    size: 0,
    contactname: '',
    contactnumber: '',
    itemgroup: '',
    filter: [],
    entrylist: [],
    expirylist: [],
    lastused: ""
}, action){
    switch(action.type){
        case  "FETCH_ITEMS_FULFILLED": {
            return {
                ...state,
                items: action.payload,
                filter: action.payload,
                fetched: true,
                added: false
            }
        }
        case "FETCH_ITEMS_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }
        case "CHANGE_FILTER": {
            return {...state, filtershow: action.payload}
        }
        case "ADD_ITEM_FULFILLED": {
            //var newitems = state.items.concat(JSON.parse(action.payload))
            return {...state, added: true}
        }
        case "ADD_ITEM_ERR":{
            return {...state, err: action.payload}
        }
        case "SEARCH":{
            return {...state, filter: _.filter(state.items, function(item){
                return item.name.toLowerCase().includes(action.payload.toLowerCase())
            })}
        }
        case "CHANGE_NAME":{
            return {...state, name: action.payload}
        }
        case "CHANGE_SIZE":{
            return {...state, size: action.payload}
        }
        case "CHANGE_CONTACT":{
            return {...state, contactname: action.payload.name, contactnumber: action.payload.number}
        }
        case "CHANGE_CNAME":{
            return {...state, contactname: action.payload}
        }
        case "CHANGE_CNUM":{
            return {...state, contactnumber: action.payload}
        }
        case "CHANGE_IG":{
            return {...state, itemgroup: action.payload}
        }
        case "CHANGE_ENTRY":{
            return {...state, entrylist: action.payload}
        }
        case "CHANGE_EXPIRY":{
            return {...state, expirylist: action.payload}
        }
        case "RESET":{
            return {...state, 
                name: "", 
                size: "", 
                contactname: "", 
                contactnumber: "",
                itemgroup: "",
                entrylist: [],
                expirylist: [],
            }
        }
    }
    return state;
}       