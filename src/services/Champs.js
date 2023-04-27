const champs_url = `${process.env.REACT_APP_BASE_URL}`

// export function getChamps(){
//     return fetch(`${users_url}/api/Users`, {
//         method: "GET",
//     })
//     .then(response => response.json())
// }

export function newChamps(data) {
  return fetch(`${champs_url}/api/Champs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function updateChamps(data, id) {
  return fetch(`${champs_url}/api/Champs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function deleteChamp(id) {
  return fetch(`${champs_url}/api/Champs/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}