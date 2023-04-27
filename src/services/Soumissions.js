const soumissions_url = `${process.env.REACT_APP_BASE_URL}`

export function getSoumissions(){
    return fetch(`${soumissions_url}/api/Soumissions`, {
        method: "GET",
    })
    .then(response => response.json())
}

export function createSoumission(data){
    return fetch(`${soumissions_url}/api/Soumissions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
}

export function updateSoumission(data, id) {
    return fetch(`${soumissions_url}/api/Soumissions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

export function getResponses(id){
    return fetch(`${soumissions_url}/api/Reponses/Soumissions/${id}`, {
        method: "GET",
    })
    .then(response => response.json())
}