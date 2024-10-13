export class Calculator {
  currentOperandClass = ".display-current";
  historyClass = ".display-history";
  calcContainerClass = ".calculator-container";
  currentOperandEl = null;
  historyEl = null;
  calcContainerEl = null;
  maxOperandSize = 32;

  currentOperand = "";
  previousOperand = "";
  operator = null;
  lastKeyPressed = null;

  constructor() {
    this.setCalcContainerWidth();
    this.currentOperandEl = document.querySelector(this.currentOperandClass);
    this.historyEl = document.querySelector(this.historyClass);
  }

  appendNumber(number) {
    if (this.currentOperand.length >= this.maxOperandSize) return;

    if (
      this.lastKeyPressed === buttonTypeMap.operator ||
      this.lastKeyPressed === buttonTypeMap.equals
    ) {
      this.currentOperand = number;
    } else {
      this.currentOperand += number;
    }

    this.lastKeyPressed = buttonTypeMap.number;
    this.updateDisplay();
  }

  appendDecimal() {
    if (!this.currentOperand.includes(".")) {
      this.currentOperand =
        this.currentOperand === "" ? "0." : this.currentOperand + ".";
    }

    this.lastKeyPressed = buttonTypeMap.decimal;
    this.updateDisplay();
  }

  handleOperator(operator) {
    if (this.currentOperand.endsWith("."))
      this.currentOperand = this.currentOperand.slice(0, -1);

    if (this.currentOperand && this.previousOperand) this.computeResult();

    this.operator = operatorSymbolMap[operator] || operator;
    this.previousOperand = this.currentOperand
      ? this.currentOperand
      : this.previousOperand;
    this.currentOperand = "";
    this.lastKeyPressed = buttonTypeMap.operator;
    this.updateDisplay();
  }

  handleEquals() {
    if (this.previousOperand && this.operator && this.currentOperand) {
      this.computeResult();
      this.lastKeyPressed = buttonTypeMap.equals;
      this.updateDisplay();
    }
  }

  computeResult() {
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

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

    this.currentOperand = computation.toString();
    this.previousOperand = "";
    this.operator = null;
  }

  handleClear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operator = null;
    this.lastKeyPressed = null;
    this.updateDisplay();
  }

  handleBackspace() {
    this.currentOperand = this.currentOperand.slice(0, -1);
    this.updateDisplay();
  }

  updateDisplay() {
    this.currentOperandEl.textContent =
      this.currentOperand || this.previousOperand || "0";
    if (this.previousOperand && this.operator) {
      this.historyEl.textContent = `${this.previousOperand} ${getKeyByValue(
        operatorSymbolMap,
        this.operator
      )}`;
    } else {
      this.historyEl.textContent = "";
    }
  }

  setCalcContainerWidth() {
    this.calcContainerEl = document.querySelector(this.calcContainerClass);
    const calculatedWidth = this.calcContainerEl.offsetWidth;
    this.calcContainerEl.style.maxWidth = `${calculatedWidth}px`;
  }
}

const buttonTypeMap = {
  number: "number",
  decimal: "decimal",
  operator: "operator",
  equals: "equals",
};

const operatorSymbolMap = {
  "×": "*",
  "÷": "/",
  "+": "+",
  "-": "-",
};

const getKeyByValue = (obj, val) => {
  return Object.keys(obj).find((key) => obj[key] === val);
};
