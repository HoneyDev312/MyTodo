import { checkField } from "./checkField.js";
import { fetchData } from "./fetchData.js";

const url = "https://jsonplaceholder.typicode.com/posts?_limit=10";

const input = document.querySelector("input");
const button = document.querySelector("#form-button");
const taskList = document.querySelector(".task-list");
const taskCard = document.querySelector(".task-card");

// FETCHDATA
let posts = [];

await fetchData(url)
  .then((data) => {
    console.log("Données reçues :", data);
    posts = [...data];
  })
  .catch((error) => console.error("Erreur :", error));

// CHECK IF FIELD IS EMPTY ON LOADING
checkField(input, button);

// CHECK IF FIELD IS EMPTY ON EACH LOADING
input.addEventListener("input", () => checkField(input, button));

document
  .getElementById("task-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let newTask = document.getElementById("newTask").value;
    console.log(newTask);
    this.reset();
    checkField();
  });

if (posts) {
  posts.forEach((post) => {
    let newTaskCard = document.createElement("li");
    newTaskCard.className = "task-card";
    newTaskCard.innerHTML = `<input class="task-checkbox" type="checkbox"/><p class="task-title">${post.title}</p><div class="task-trash"><i class="fa-solid fa-trash"></i></div>`;
    taskList.appendChild(newTaskCard);
  });
}
