const documents_url = `${process.env.REACT_APP_BASE_URL}`

export function getDocuments(){
    return fetch(`${documents_url}/api/Documents`, {
        method: "GET",
    })
    .then(response => response.json())
}

export function getOneDocument(id){
    return fetch(`${documents_url}/api/Documents/${id}`, {
        method: "GET",
    })
    .then(response => response.json())
}

export function getDocumentsById(id){
    return fetch(`${documents_url}/api/Documents/${id}/Champs`, {
        method: "GET",
    })
    .then(response => response.json())
}

export function createDocument(data){  
    return fetch(`${documents_url}/api/Documents`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
}

export function updateDocument(data, id){  
    return fetch(`${documents_url}/api/Documents/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
}

export function deleteDocument(data, id){  
    return fetch(`${documents_url}/api/Documents/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
}
