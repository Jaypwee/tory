export default function reducer(state={
    settings: [],
    error: null,
    fetched: false
},action){
    switch(action.type){
        case "FETCH_SET_FULFILLED":{
            return{
                ...state,
                settings: action.payload,
                fetched: true
            }
        }
        case "FETCH_SET_REJECTEd":{
            return{
                ...state,
                error: action.payload
            }
        }
        case "ADD_SET":{
            return{
                ...state,
                settings: [JSON.parse(action.payload)]
            }
        }
        case "ADD_SET_REJECTED":{
            return{
                ...state,
                error: action.payload
            }
        }
    }
    return state;
}   