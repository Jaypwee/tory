export default function reducer(state={
    logs: [],
    error: null,
    fetched: false
},action){
    switch(action.type){
        case "FETCH_LOG_FULFILLED":{
            return{
                ...state,
                logs: action.payload,
                fetched: true
            }
        }
        case "FETCH_LOG_REJECTED":{
            return{
                ...state,
                error: action.payload
            }
        }
        case "ADD_DEPOSIT_FULFILLED":{
            var newlog = state.logs.concat(JSON.parse(action.payload))
            return{
                ...state,
                logs: newlog
            }
        }   
        case "ADD_LOG_REJECTED":{
            return{
                ...state,
                error: action.payload
            }
        }
    }
    return state;
}   