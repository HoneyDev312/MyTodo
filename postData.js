export async function postData(url, data = {}) {
  console.log("data postData", data);
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    method: "POST",
    // mode: "cors",
    // cache: "no-cache",
    // credentials: "same-origin",
    body: JSON.stringify(data),
    headers,
  });
  return response.json();
}
