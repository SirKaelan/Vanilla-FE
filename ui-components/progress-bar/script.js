import { ProgressBar } from "./ProgressBar.js";

// Input elements
// const progressBtn = document.querySelector(".progress-button");
const resetBtn = document.querySelector(".btn--reset");
const uploadForm = document.querySelector(".upload-form");
const fileSelectBtn = document.querySelector(".file-select");

// Instance of ProgressBar class
const progressBar = new ProgressBar("progress-bar", "progress-percent-label");

// Create event listeners
// progressBtn.addEventListener("click", () => {
//   progressBar.increaseBarProgress(10);
// });

resetBtn.addEventListener("click", () => {
  progressBar.resetBar();
  // To remove the selected files from input with type file
  fileSelectBtn.value = fileSelectBtn.defaultValue;
});

uploadForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Error if no files were selected for upload
  const selectedFiles = fileSelectBtn.files;
  if (selectedFiles.length === 0) {
    alert("Please select a file.");
    return;
  }

  // Simulate file upload
  let uploadProgress = 0;
  const simulatedProgress = setInterval(() => {
    uploadProgress += Math.floor(Math.random() * 11);
    if (uploadProgress >= 100) {
      uploadProgress = 100;
      clearInterval(simulatedProgress);
    }
    progressBar.setBarProgress(uploadProgress);
  }, 400);
});
