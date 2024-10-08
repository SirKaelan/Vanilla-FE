import { Calculator } from "./Calculator.js";

const buttons = document.querySelectorAll("[data-input]");

const calc = new Calculator();

buttons.forEach((button) => {
  const dataInputType = button.dataset.input;

  switch (dataInputType) {
    case "number":
      button.addEventListener("click", () => {
        calc.appendNumber(button.innerText);
      });
      break;
    case "operator":
      button.addEventListener("click", () => {
        calc.handleOperator(button.innerText);
      });
      break;
    case "clear":
      button.addEventListener("click", () => {
        calc.handleClear();
      });
      break;
    case "backspace":
      button.addEventListener("click", () => {
        calc.handleBackspace();
      });
      break;
    case "equals":
      button.addEventListener("click", () => {
        calc.handleEquals();
      });
      break;
    case "decimal":
      button.addEventListener("click", () => {
        calc.appendDecimal();
      });
      break;
    default:
      console.log("Incorrect button type.");
  }
});
