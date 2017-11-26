export function fetchItems(){
    return function(dispatch){
        fetch("/items/get")
            .then((response)=> response.json()
            .then((data) => {
                dispatch({type: "FETCH_ITEMS_FULFILLED", payload: data})
                dispatch({type: "SEARCH", payload: ""}) //To Make filtered = items
            }))
            .catch((err) => {
                dispatch({type: "FETCH_ITEMS_REJECTED", payload: err})
            })
        }
}

export function changeFilter(newFilter){
    return function(dispatch){
        dispatch({type: "CHANGE_FILTER", payload: newFilter})
    }
}

export function addItem(data){
    return function(dispatch){
        fetch("/items/add", {
            method: "PUT",
            body: data
        }).then((response)=>{
            dispatch({type: "ADD_ITEM_FULFILLED"})
        }).catch((err) =>{
            dispatch({type: "ADD_ITEM_REJECTED", payload: data})
        })
    }
}

export function changeName(event){
    return function(dispatch){
        dispatch({type: "CHANGE_NAME", payload: event.target.value})
        dispatch({type: "SEARCH", payload: event.target.value})
    }
}

export function changeSize(event){
    return function(dispatch){
        dispatch({type: "CHANGE_SIZE", payload: event.target.value})
    }
}

export function changeContact(event){
    return function(dispatch){
        if (event.target.value !== "none"){
            dispatch({type: "CHANGE_CONTACT", payload: JSON.parse(event.target.value)})
        }
    }
}

export function changeIG(event){
    return function(dispatch){
        dispatch({type: "CHANGE_IG", payload: event.target.value})
    }
}

export function changeToExisting(item){
    return function(dispatch){
        dispatch({type: "CHANGE_NAME", payload: item.name})
        dispatch({type: "CHANGE_SIZE", payload: item.size})
        dispatch({type: "CHANGE_CNAME", payload: item.contactname})
        dispatch({type: "CHANGE_CNUM", payload: item.contactnumber})
        dispatch({type: "CHANGE_IG", payload: item.itemgroup})
        dispatch({type: "CHANGE_ENTRY", payload: item.entrylist})
        dispatch({type: "CHANGE_EXPIRY", payload: item.expirationlist})
    }
}

export function reset(){
    return function(dispatch){
        dispatch({type: "RESET"})
    }
}