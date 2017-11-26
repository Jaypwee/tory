
export function fetchCL(){
    return function(dispatch){
        fetch("contactlist/get")
            .then((response)=>response.json()
                .then((data)=>{
                    dispatch({type: "FETCH_CL_FULFILLED", payload: data})
                }))
                .catch((err)=>{
                    dispatch({type: "FETCH_CL_REJECTED", payload: err})
                })
    }
}

export function addCL(data){
    return function(dispatch){
        fetch("contactlist/post", {
            method: "POST",
            body: data
        })
        .then((response)=>{
            dispatch({type: "ADD_CL", payload: data})
        })
        .catch((err)=>{
            dispatch({type: "ADD_CL", payload: err})
        })
    }
}