const input = document.querySelector("input");
const button = document.getElementById("form-button");

function checkField() {
  let inputFilled = true;

  if (input.value.trim() === "") {
    inputFilled = false;
  }

  button.disabled = !inputFilled;
}

// Vérifie au chargement
checkField();

// Vérifie à chaque changement
input.addEventListener("input", checkField);

document
  .getElementById("task-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let newTask = document.getElementById("newTask").value;
    console.log(newTask);
    this.reset();
    checkField();
  });
