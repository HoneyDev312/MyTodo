export async function deleteData(url, data = {}) {
  console.log("data delete", data.todo._id);
  try {
    const headers = {
      Accept: "aplication/json",
      "Content-Type": "application/json",
    };

    const response = await fetch(`${url}/${data.todo._id}`, {
      method: "DELETE",
      // mode: "cors",
      // cache: "no-cache",
      // credentials: "same-origin",
      headers,
    });
    return response.json();
  } catch (erreur) {
    console.error("Erreur :", erreur);
  }
}
