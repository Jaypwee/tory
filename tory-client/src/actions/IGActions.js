
export function fetchIG(){
    return function(dispatch){
        fetch("itemgroup/get")
            .then((response)=>response.json()
                .then((data)=>{
                    dispatch({type: "FETCH_IG_FULFILLED", payload: data})
                }))
                .catch((err)=>{
                    dispatch({type: "FETCH_IG_REJECTED", payload: err})
                })
    }
}

export function addIG(data){
    return function(dispatch){
        fetch("itemgroup/post", {
            method: "POST",
            body: data
        })
        .then((response)=>{
            dispatch({type: "ADD_IG", payload: data})
        })
        .catch((err)=>{
            dispatch({type: "ADD_IG_REJECTED", payload: err})
        })
    }
}

export function IGreset(){
    return function(dispatch){
        dispatch({type: "RESET"})
    }
}