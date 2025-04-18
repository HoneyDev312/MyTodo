import { TodoList } from "./TodoList.js";
import { checkField } from "./checkField.js";
import { createElement } from "./dom.js";
import { fetchData } from "./fetchData.js";

// const url = "https://jsonplaceholder.typicode.com/todos?_limit=10";
const url = "http://localhost:3000/api/todos";
const body = document.querySelector("body");
const input = document.querySelector("input");
const button = document.querySelector("#form-button");

// FETCHDATA
try {
  const todos = await fetchData(url);
  // const storedTodos = localStorage.getItem("todos")?.toString();
  // let todos = [];
  // if (storedTodos) {
  //   todos = JSON.parse(storedTodos);
  // }
  const todoList = new TodoList(todos);

  todoList.appendTo(body);

  // CHECK IF FIELD IS EMPTY ON LOADING
  checkField(input, button);

  // CHECK IF FIELD IS EMPTY ON EACH LOADING
  input.addEventListener("input", () => checkField(input, button));
} catch (error) {
  console.log(error);
  const errorElement = createElement("div", {
    class: "error-card",
    role: "alert-error",
  });

  errorElement.innerText = "Impossible de charger le contenu !";
  body.prepend(errorElement);
}
