export default function reducer(state={
    IGList: [],
    error: null,
    fetched: false,
    added: false
}, action){
    switch(action.type){
        case "FETCH_IG_FULFILLED":{
            return{
                ...state,
                IGList: action.payload,
                fetched: true
            }
        }
        case "FETCH_IG_REJECTED":{
            return{
                ...state,
                error: action.payload
            }
        }
        case "ADD_IG":{
            var newlist = state.IGList.concat(JSON.parse(action.payload))
            console.log(newlist)
            return{
                ...state,
                IGList: newlist,
                added: true
            }
        }
        case "ADD_IG_REJECTED":{
            return{
                ...state,
                error: action.payload
            }
        }
        case "RESET":{
            return{...state, added: false}
        }
    }
    return state;
}