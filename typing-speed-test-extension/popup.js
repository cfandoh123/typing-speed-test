const testString = "The big brown fox jumps over the lazy dog";
const wordCount = testString.split(" ").length;

let startTime = null;

const userInput = document.getElementById('user-input');
const startBtn = document.getElementById('start-btn');
const resultsDiv = document.getElementById('results');
const retryBtn = document.getElementById('retry-btn');

const totalWordsSpan = document.getElementById('total-words');
const timeUsedSpan = document.getElementById('time-used');
const accuracySpan = document.getElementById('accuracy');
const wpmSpan = document.getElementById('wpm');

function resetTest() {
  userInput.value = "";
  userInput.disabled = true;
  startBtn.disabled = false;
  resultsDiv.classList.add('hidden');
}

function startTest() {
  userInput.disabled = false;
  userInput.value = "";
  userInput.focus();
  startBtn.disabled = true;
  resultsDiv.classList.add('hidden');
  startTime = new Date().getTime();
}

function showResults() {
  const endTime = new Date().getTime();
  const timeTaken = (endTime - startTime) / 1000;
  const inputWords = userInput.value.trim().split(/\s+/);
  const lengthOfInput = inputWords.length;
  const accuracyCount = inputWords.filter(word => testString.split(" ").includes(word)).length;
  const accuracy = (accuracyCount / wordCount) * 100;
  const wpm = (lengthOfInput / timeTaken) * 60;

  totalWordsSpan.textContent = lengthOfInput;
  timeUsedSpan.textContent = timeTaken.toFixed(2);
  accuracySpan.textContent = accuracy.toFixed(1);
  wpmSpan.textContent = wpm.toFixed(2);

  resultsDiv.classList.remove('hidden');
  userInput.disabled = true;
  startBtn.disabled = false;
}

startBtn.addEventListener('click', () => {
  startTest();
});

userInput.addEventListener('keydown', (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    showResults();
  }
});

retryBtn.addEventListener('click', () => {
  resetTest();
});

window.onload = resetTest; 