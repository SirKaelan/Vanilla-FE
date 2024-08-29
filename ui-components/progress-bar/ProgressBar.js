export class ProgressBar {
  progressBarEl;
  percentLabelEl;
  currentBarWidth = 0;
  roundedBorderCssClass = "rounded-bar-right";

  constructor(progressBarClass, percentLabelClass) {
    this.progressBarEl = document.querySelector(`.${progressBarClass}`);
    this.percentLabelEl = document.querySelector(`.${percentLabelClass}`);
  }

  setBarProgress(percentProgress) {
    this.currentBarWidth = percentProgress;
    this.updateProgressBar();
    this.updatePercentLabel();
    this.fullProgressBarBorderFix();
  }

  increaseBarProgress(percentIncrement) {
    const newWidth = this.calculateWidth(percentIncrement, "addition");
    if (newWidth === null) return;
    this.currentBarWidth = newWidth;
    this.updateProgressBar();
    this.updatePercentLabel();
    this.fullProgressBarBorderFix();
  }

  updatePercentLabel() {
    this.percentLabelEl.innerHTML = `${this.currentBarWidth}%`;
  }

  updateProgressBar() {
    this.progressBarEl.style.width = `${this.currentBarWidth}%`;
  }

  resetBar() {
    this.currentBarWidth = 0;
    this.progressBarEl.style.width = "0%";
    this.percentLabelEl.innerHTML = "0%";
    if (this.progressBarEl.classList.contains(this.roundedBorderCssClass))
      this.progressBarEl.classList.remove(this.roundedBorderCssClass);
  }

  calculateWidth(percentIncrement, operationType) {
    let newWidth = 0;
    if (operationType === "addition") {
      newWidth = this.currentBarWidth + percentIncrement;
    } else if (operationType === "subtraction") {
      newWidth = this.currentBarWidth - percentIncrement;
    }
    // We don't want width to be over 100 or below 0 percent
    if (newWidth < 0 || newWidth > 100) return null;
    return newWidth;
  }

  fullProgressBarBorderFix() {
    if (this.currentBarWidth !== 100) return;
    this.progressBarEl.classList.add(this.roundedBorderCssClass);
  }
}
