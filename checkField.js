export function checkField(input, button) {
  let inputFilled = true;

  if (input?.value?.trim() === "") {
    inputFilled = false;
  }

  if (!button) {
    return;
  }

  button.disabled = !inputFilled;
}
