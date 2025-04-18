import { checkField } from "./checkField.js";
import { createElement } from "./dom.js";
import { postData } from "./postData.js";
import { updateData } from "./updateData.js";
import { deleteData } from "./deleteData.js";

/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */

export class TodoList {
  /**
   * @type {Todo[]}
   */
  #todos = [];

  /**
   * @type {HTMLUListElement}
   */
  #listElement;

  /**
   *
   * @param {Todo[]}
   */
  constructor(todos) {
    this.#todos = todos;
  }
  /**
   *
   * @param {HTMLElement}
   */
  appendTo(element) {
    this.#listElement = createElement("ul", { class: "task-list" });

    this.#todos.forEach((todo) => {
      let todoElement = new TodoListItem(todo);
      this.#listElement.prepend(todoElement.element);
    });

    element.querySelector(".task-form").addEventListener("submit", (e) => {
      this.#onSubmit(e);
      checkField();
    });
    element
      .querySelectorAll(".filter-list button")
      .forEach((button) =>
        button.addEventListener("click", (e) => this.#toggleFilter(e))
      );

    this.#listElement.addEventListener(
      "deleteTodo",

      async ({ detail: todo }) => {
        this.#todos = this.#todos.filter((t) => t !== todo);
        await deleteData("http://localhost:3000/api/todos", {
          todo,
        }).then((data) => {
          console.log("deleteData", data);
        });
        // this.#onUpdate();
      }
    );

    this.#listElement.addEventListener(
      "toggleTodo",
      async ({ detail: todo }) => {
        todo.completed = !todo.completed;
        await updateData("http://localhost:3000/api/todos", {
          todo,
        }).then((data) => {
          console.log("updateData", data);
        });
        // this.#onUpdate();
      }
    );

    element.append(this.#listElement);
  }

  /**
   *
   * @param {SubmitEvent} e
   */
  async #onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const button = document.querySelector("#form-button");
    const input = document.querySelector("input");
    const title = new FormData(form).get("newTask").toString().trim();
    if (title === "") {
      return;
    }
    const todo = {
      title,
    };
    const newTodo = new TodoListItem(todo);
    this.#listElement.prepend(newTodo.element);
    this.#todos.push(todo);
    await postData("http://localhost:3000/api/todos", {
      data: todo.title,
    }).then((data) => {
      console.log("postData", data);
    });
    // this.#onUpdate();
    form.reset();
    checkField(input, button);
    input.focus();
  }

  #onUpdate() {
    localStorage.setItem("todos", JSON.stringify(this.#todos));
  }

  /**
   *
   * @param {PointerEvent} e
   */
  #toggleFilter(e) {
    e.preventDefault();
    const filter = e.currentTarget.getAttribute("data-filter");
    e.currentTarget.parentElement
      .querySelector(".active")
      .classList.remove("active");
    if (!e.currentTarget.classList.contains(".active")) {
      e.currentTarget.classList.add("active");
    }
    if (filter === "todo") {
      this.#listElement.classList.add("hide-completed");
      this.#listElement.classList.remove("hide-todo");
    } else if (filter === "done") {
      this.#listElement.classList.add("hide-todo");
      this.#listElement.classList.remove("hide-completed");
    } else {
      this.#listElement.classList.remove("hide-todo");
      this.#listElement.classList.remove("hide-completed");
    }
  }
}

export class TodoListItem {
  /**
   * @type {HTMLElement}
   */
  #element;

  /**
   * @type {Todo}
   */
  #todo;

  /**
   * @type {Todo}
   */
  constructor(todo) {
    this.#todo = todo;
    const id = `todo-${todo.id}`;
    const li = createElement("li", { class: "task-card" });
    this.#element = li;
    const checkbox = createElement("input", {
      class: "task-checkbox",
      type: "checkbox",
      id,
      checked: todo.completed ? "" : null,
    });
    const title = createElement("label", { class: "task-title", for: id });
    title.innerText = todo.title;
    const trashContainer = createElement("button", { class: "task-trash" });
    const trash = createElement("i", { class: "fa-solid fa-trash" });
    trashContainer.append(trash);
    li.append(checkbox);
    li.append(title);
    li.append(trashContainer);
    this.toggle(checkbox);

    trashContainer.addEventListener("click", (e) => this.remove(e));
    checkbox.addEventListener("change", (e) => this.toggle(e.currentTarget));
  }

  /**
   *
   * @return {HTMLElement}
   */
  get element() {
    return this.#element;
  }

  /**
   *
   * @param {PointerEvent} e
   */
  remove(e) {
    e.preventDefault();
    const event = new CustomEvent("deleteTodo", {
      detail: this.#todo,
      bubbles: true,
      cancelable: true,
    });
    this.#element.dispatchEvent(event);
    if (event.defaultPrevented) {
      return;
    }
    this.#element.remove();
  }

  /**
   *
   * @param {HTMLInputEvent} checkbox
   */
  toggle(checkbox) {
    if (checkbox.checked) {
      this.#element.classList.add("is-completed");
    } else {
      this.#element.classList.remove("is-completed");
    }
    const event = new CustomEvent("toggleTodo", {
      detail: this.#todo,
      bubbles: true,
    });
    this.#element.dispatchEvent(event);
  }
}
