const challenges = {
  easy: [
    "The big brown fox jumps over the lazy dog",
    "Hello world",
    "Typing is fun",
    "Practice makes perfect",
    "Quick red hen"
  ],
  medium: [
    "JavaScript is a versatile programming language",
    "Chrome extensions enhance browser functionality",
    "Typing speed improves with regular practice",
    "Accuracy is as important as speed",
    "The quick brown fox jumps over the lazy dog"
  ],
  hard: [
    "Sphinx of black quartz, judge my vow",
    "Pack my box with five dozen liquor jugs",
    "The five boxing wizards jump quickly",
    "How vexingly quick daft zebras jump",
    "Crazy Frederick bought many very exquisite opal jewels"
  ]
};

let currentChallenge = '';
let wordCount = 0;
let startTime = null;
let testStarted = false;

const testStringElem = document.getElementById('test-string');
const userInput = document.getElementById('user-input');
const startBtn = document.getElementById('start-btn');
const retryBtn = document.getElementById('retry-btn');
const resultsDiv = document.getElementById('results');
const totalWordsSpan = document.getElementById('total-words');
const timeUsedSpan = document.getElementById('time-used');
const accuracySpan = document.getElementById('accuracy');
const wpmSpan = document.getElementById('wpm');
const difficultySelect = document.getElementById('difficulty');
const newChallengeBtn = document.getElementById('new-challenge');

function pickChallenge() {
  const level = difficultySelect.value;
  const arr = challenges[level];
  const idx = Math.floor(Math.random() * arr.length);
  currentChallenge = arr[idx];
  wordCount = currentChallenge.split(/\s+/).length;
  testStringElem.textContent = currentChallenge;
  userInput.value = '';
  userInput.disabled = true;
  startBtn.disabled = false;
  retryBtn.disabled = true;
  resultsDiv.classList.add('hidden');
  testStarted = false;
}

function startTest() {
  userInput.disabled = false;
  userInput.value = '';
  userInput.focus();
  startBtn.disabled = true;
  retryBtn.disabled = true;
  resultsDiv.classList.add('hidden');
  startTime = new Date().getTime();
  testStarted = true;
}

function showResults() {
  const endTime = new Date().getTime();
  const timeTaken = (endTime - startTime) / 1000;
  const inputWords = userInput.value.trim().split(/\s+/);
  let correct = 0;
  const challengeWords = currentChallenge.split(/\s+/);
  for (let i = 0; i < Math.min(inputWords.length, challengeWords.length); i++) {
    if (inputWords[i] === challengeWords[i]) correct++;
  }
  const accuracy = (correct / wordCount) * 100;
  const wpm = (inputWords.length / timeTaken) * 60;

  totalWordsSpan.textContent = inputWords.length;
  timeUsedSpan.textContent = timeTaken.toFixed(2);
  accuracySpan.textContent = accuracy.toFixed(1);
  wpmSpan.textContent = wpm.toFixed(2);

  resultsDiv.classList.remove('hidden');
  userInput.disabled = true;
  startBtn.disabled = false;
  retryBtn.disabled = false;
  testStarted = false;
}

function resetTest() {
  userInput.value = '';
  userInput.disabled = true;
  startBtn.disabled = false;
  retryBtn.disabled = true;
  resultsDiv.classList.add('hidden');
  testStarted = false;
}

startBtn.addEventListener('click', () => {
  if (!currentChallenge) pickChallenge();
  startTest();
});

retryBtn.addEventListener('click', () => {
  userInput.value = '';
  userInput.disabled = false;
  userInput.focus();
  startBtn.disabled = true;
  retryBtn.disabled = true;
  resultsDiv.classList.add('hidden');
  startTime = new Date().getTime();
  testStarted = true;
});

newChallengeBtn.addEventListener('click', () => {
  pickChallenge();
});

difficultySelect.addEventListener('change', () => {
  pickChallenge();
});

userInput.addEventListener('input', () => {
  if (!testStarted) return;
  // Highlight errors in real-time (optional enhancement)
  const challengeWords = currentChallenge.split(/\s+/);
  const inputWords = userInput.value.trim().split(/\s+/);
  let highlighted = '';
  for (let i = 0; i < inputWords.length; i++) {
    if (challengeWords[i] === undefined) break;
    if (inputWords[i] === challengeWords[i]) {
      highlighted += `<span style='color:green'>${inputWords[i]}</span> `;
    } else {
      highlighted += `<span style='color:red'>${inputWords[i]}</span> `;
    }
  }
  // Optionally, show this somewhere in the UI
});

userInput.addEventListener('keydown', (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    if (testStarted) showResults();
  }
});

window.onload = () => {
  pickChallenge();
}; 