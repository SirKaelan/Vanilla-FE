export class ProgressBar {
  progressBarEl;
  percentLabelEl;
  currentBarWidth = 0;

  constructor(progressBarClass, percentLabelClass) {
    this.progressBarEl = document.querySelector(`.${progressBarClass}`);
    this.percentLabelEl = document.querySelector(`.${percentLabelClass}`);
  }

  increaseProgressBar(percentIncrement) {
    const newWidth = this.calculateWidth(percentIncrement, "addition");
    if (newWidth === null) return;
    this.currentBarWidth = newWidth;
    this.progressBarEl.style.width = `${this.currentBarWidth}%`;
    this.updatePercentLabel();
  }

  updatePercentLabel() {
    this.percentLabelEl.innerHTML = `${this.currentBarWidth}%`;
  }

  resetBar() {
    this.currentBarWidth = 0;
    this.progressBarEl.style.width = "0%";
    this.percentLabelEl.innerHTML = "0%";
  }

  calculateWidth(percentIncrement, operationType) {
    let newWidth = 0;
    if (operationType === "addition") {
      newWidth = this.currentBarWidth + percentIncrement;
    } else if (operationType === "subtraction") {
      newWidth = this.currentBarWidth - percentIncrement;
    }
    // We don't want width to be over 100 or bellow 0 percent
    if (newWidth < 0 || newWidth > 100) return null;
    return newWidth;
  }
}
