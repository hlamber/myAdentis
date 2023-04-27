const reponses_url = `${process.env.REACT_APP_BASE_URL}`

export function createReponse(data){
    console.log(data)
    return fetch(`${reponses_url}/api/Reponses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
}

export function saveReponse(data, id){  
    return fetch(`${reponses_url}/api/Reponses/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
}