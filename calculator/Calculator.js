export class Calculator {
  currentOpperandClass = ".display-current";
  historyClass = ".display-history";
  currentOpperandEl = null;
  historyEl = null;

  currentOpperand = "";
  previousOpperand = "";
  operator = null;
  lastKeyPressed = null;

  constructor() {
    this.currentOpperandEl = document.querySelector(this.currentOpperandClass);
    this.historyEl = document.querySelector(this.historyClass);
  }

  appendNumber(number) {
    if (
      this.lastKeyPressed === keyPressMap.operator ||
      this.lastKeyPressed === keyPressMap.equals
    ) {
      this.currentOpperand = number;
    } else {
      this.currentOpperand += number;
    }

    this.lastKeyPressed = keyPressMap.number;
    this.updateDisplay();
  }

  appendDecimal() {
    if (!this.currentOpperand.includes(".")) {
      this.currentOpperand =
        this.currentOpperand === "" ? "0." : this.currentOpperand + ".";
    }

    this.lastKeyPressed = keyPressMap.decimal;
    this.updateDisplay();
  }

  handleOperator(operator) {
    if (this.currentOpperand.endsWith("."))
      this.currentOpperand = this.currentOpperand.slice(0, -1);

    if (this.currentOpperand && this.previousOpperand) this.computeResult();

    this.operator = operator;
    this.previousOpperand = this.currentOpperand
      ? this.currentOpperand
      : this.previousOpperand;
    this.currentOpperand = "";
    this.lastKeyPressed = keyPressMap.operator;
    this.updateDisplay();
  }

  handleEquals() {
    if (this.previousOpperand && this.operator && this.currentOpperand) {
      this.computeResult();
      this.lastKeyPressed = keyPressMap.equals;
      this.updateDisplay();
    }
  }

  computeResult() {
    const prev = parseFloat(this.previousOpperand);
    const current = parseFloat(this.currentOpperand);

    if (isNaN(prev) || isNaN(current)) return;

    // Guard against dividing by zero
    if (this.operator === "/" && current === 0) {
      this.handleClear();
      return;
    }

    let computation;
    switch (this.operator) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
    }

    this.currentOpperand = computation.toString();
    this.previousOpperand = "";
    this.operator = null;
  }

  handleClear() {
    this.currentOpperand = "";
    this.previousOpperand = "";
    this.operator = null;
    this.lastKeyPressed = null;
    this.updateDisplay();
  }

  handleBackspace() {
    this.currentOpperand = this.currentOpperand.slice(0, -1);
    this.updateDisplay();
  }

  updateDisplay() {
    this.currentOpperandEl.textContent =
      this.currentOpperand || this.previousOpperand || "0";
    if (this.previousOpperand && this.operator) {
      this.historyEl.textContent = `${this.previousOpperand} ${this.operator}`;
    } else {
      this.historyEl.textContent = "";
    }
  }
}

const keyPressMap = {
  number: "number",
  decimal: "decimal",
  operator: "operator",
  equals: "equals",
};
