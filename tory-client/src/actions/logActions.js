export function fetchLog(){
    return function(dispatch){
        fetch("/logs/get")
            .then((response)=> response.json()
            .then((data) => {
                dispatch({type: "FETCH_LOG_FULFILLED", payload: data})
            }))
            .catch((err) => {
                dispatch({type: "FETCH_LOG_REJECTED", payload: err})
            })
        }
}

export function addDeposit(data){
    console.log(data)
    return function(dispatch){
        fetch("/logs/post", {
            method: "POST",
            body: data
        }).then((response)=>{
            dispatch({type: "ADD_DEPOSIT_FULFILLED", data})
        }).catch((err) =>{
            dispatch({type: "ADD_LOG_REJECTED", payload: err})
        })
    }
}