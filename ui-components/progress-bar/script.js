import { ProgressBar } from "./ProgressBar.js";

// Input elements
const progressBtn = document.querySelector(".progress-button");
const resetBtn = document.querySelector(".progress-button--reset");

// Instance of ProgressBar class
const progressBar = new ProgressBar("progress-bar", "progress-percent-label");

// Create event listeners
progressBtn.addEventListener("click", () => {
  progressBar.increaseProgressBar(10);
});

resetBtn.addEventListener("click", () => {
  progressBar.resetBar();
});
