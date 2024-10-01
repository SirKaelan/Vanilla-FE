const buttons = document.querySelectorAll("[data-input]");

buttons.forEach((button) => {
  const dataInputType = button.dataset.input;

  switch (dataInputType) {
    case "number":
      button.addEventListener("click", () => {
        console.log("Number clicked!");
      });
      break;
    case "operator":
      button.addEventListener("click", () => {
        console.log("Operator clicked!");
      });
      break;
    case "clear":
      button.addEventListener("click", () => {
        console.log("Clear clicked!");
      });
      break;
    case "delete":
      button.addEventListener("click", () => {
        console.log("Backspace clicked!");
      });
      break;
    case "equals":
      button.addEventListener("click", () => {
        console.log("Equals clicked!");
      });
      break;
    case "floating-point":
      button.addEventListener("click", () => {
        console.log("Floating point clicked!");
      });
      break;
    default:
      console.log("Incorrect button type.");
  }
});
