const users_url = `${process.env.REACT_APP_BASE_URL}`

export function getUsers(){
    return fetch(`${users_url}/api/Users`, {
        method: "GET",
    })
    .then(response => response.json())
}

export function createUser(data){
    return fetch(`${users_url}/api/Users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
}

export function updateUser(data, id){
    return fetch(`${users_url}/api/Users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
}