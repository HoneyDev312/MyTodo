// fetchModule.js
export async function fetchData(url, options = {}) {
  const headers = { Accept: "aplication/json", ...options.headers };

  const response = await fetch(url, { ...options, headers });
  if (response.ok) {
    return response.json();
  }
  throw new Error("Erreur Server", { cause: response });
}
