
export function fetchSettings(){
    return function(dispatch){
        fetch("settings/get")
            .then((response)=>response.json()
                .then((data)=>{
                    dispatch({type: "FETCH_SET_FULFILLED", payload: data})
                }))
                .catch((err)=>{
                    dispatch({type: "FETCH_SET_REJECTED", payload: err})
                })
    }
}

export function updateSettings(data){
    return function(dispatch){
        fetch("settings/update", {
            method: "PUT",
            body: data
        })
        .then((response)=>{
            dispatch({type: "ADD_SET", payload: data})
        })
        .catch((err)=>{
            dispatch({type: "ADD_SET", payload: err})
        })
    }
}