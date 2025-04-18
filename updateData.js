export async function updateData(url, data = {}) {
  console.log("data updateData", data.todo._id);
  try {
    const headers = {
      Accept: "aplication/json",
      "Content-Type": "application/json",
    };

    const response = await fetch(`${url}/${data.todo._id}`, {
      method: "PUT",
      // mode: "cors",
      // cache: "no-cache",
      // credentials: "same-origin",
      body: JSON.stringify({ completed: data.todo.completed }),
      headers,
    });
    return response.json();
  } catch (erreur) {
    console.error("Erreur :", erreur);
  }
}
