export default function reducer(state={
    contactlist: [],
    error: null,
    fetched: false //This is for async uses in initialize() function @ overview.js
}, action){
    switch(action.type){
        case "FETCH_CL_FULFILLED":{
            return{
                ...state,
                contactlist: action.payload,
                fetched: true
            }
        }
        case "FETCH_CL_REJECTED":{
            return{
                ...state,
                error: action.payload
            }
        }
        case "ADD_CL":{
            var newlist = state.contactlist.concat(JSON.parse(action.payload))
            return{
                ...state,
                contactlist: newlist
            }
        }
        case "ADD_CL_REJECTED":{
            return{
                ...state,
                error: action.payload
            }
        }
    }
    return state;
}