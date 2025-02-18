import { checkField } from "./checkField.js";

const input = document.querySelector("input");
const button = document.querySelector("#form-button");
const taskList = document.querySelector("#task-list");

// Vérifie au chargement
checkField(input, button);

// Vérifie à chaque changement
input.addEventListener("input", () => checkField(input, button));

document
  .getElementById("task-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let newTask = document.getElementById("newTask").value;
    console.log(newTask);
    this.reset();
    checkField(input, button);
  });

// if (posts) {
//   posts.forEach((post) => {
//     taskList.appendChild(`
//        <div class="task-card">
//         <p class="task-title">${post.title}</p>
//       </div>`);
//   });
// }
