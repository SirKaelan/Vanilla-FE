export class Calculator {
  currentOperandClass = ".display-current";
  historyClass = ".display-history";
  calcContainerClass = ".calculator-container";
  displayContainerClass = ".display-container";
  currentOperandEl = null;
  historyEl = null;
  calcContainerEl = null;
  maxOperandSize = 16;
  decimalPlaces = 2;

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
    if (
      this.lastKeyPressed === buttonTypeMap.operator ||
      this.lastKeyPressed === buttonTypeMap.equals
    ) {
      this.currentOperand = number;
    } else {
      if (
        !this.currentOperand.includes(".") &&
        this.currentOperand.length >= this.maxOperandSize
      ) {
        return;
      }

      const newOperand = this.currentOperand + number;
      if (newOperand.includes(".")) {
        if (newOperand.split(".")[1].length > this.decimalPlaces) return;
      }
      this.currentOperand += number;
    }

    this.lastKeyPressed = buttonTypeMap.number;
    this.updateDisplay();
    this.adjustOperandFontSize();
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
      this.adjustOperandFontSize();
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
    this.adjustOperandFontSize();
  }

  handleBackspace() {
    this.currentOperand = this.currentOperand.slice(0, -1);
    this.updateDisplay();
    this.adjustOperandFontSize();
  }

  updateDisplay() {
    this.currentOperandEl.textContent = this.currentOperand.endsWith(".")
      ? this.formatOperand(this.currentOperand) + "."
      : this.formatOperand(this.currentOperand) ||
        this.formatOperand(this.previousOperand) ||
        "0";

    if (this.previousOperand && this.operator) {
      this.historyEl.textContent = `${this.formatOperand(
        this.previousOperand
      )} ${getKeyByValue(operatorSymbolMap, this.operator)}`;
    } else {
      this.historyEl.textContent = "";
    }
  }

  setCalcContainerWidth() {
    this.calcContainerEl = document.querySelector(this.calcContainerClass);
    const calculatedWidth = this.calcContainerEl.offsetWidth;
    this.calcContainerEl.style.maxWidth = `${calculatedWidth}px`;
  }

  // This might be buggy and lose integer information
  formatOperand(val) {
    const castedVal = parseFloat(val);
    if (isNaN(castedVal)) return;

    return parseFloat(castedVal.toFixed(this.decimalPlaces)).toLocaleString();
  }

  adjustOperandFontSize() {
    const displayContainerWidth = document.querySelector(
      this.displayContainerClass
    ).clientWidth;
    let fontSize = 0.5;
    const maxFontSize = 5;

    while (fontSize <= maxFontSize) {
      this.currentOperandEl.style.fontSize = `${fontSize}rem`;
      if (this.currentOperandEl.scrollWidth > displayContainerWidth) {
        break;
      }
      fontSize += 0.1;
    }

    while (
      this.currentOperandEl.scrollWidth > displayContainerWidth &&
      fontSize > 0.5
    ) {
      fontSize -= 0.1;
      this.currentOperandEl.style.fontSize = `${fontSize}rem`;
    }
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
