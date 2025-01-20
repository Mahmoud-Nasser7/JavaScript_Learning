'use strict';

const check = document.querySelector('.check');
const message = document.querySelector('.message');
const chosen = document.querySelector('.number');
const score = document.querySelector('.score');
const guess = document.querySelector('.guess');
const body = document.querySelector('body');
const again = document.querySelector('.again');
const highscore = document.querySelector('.highscore');
let secretNumber = Math.trunc(Math.random() * 20) + 1;
const displayMessage = text => {
  message.textContent = text;
};
const condition = () => {
  if (score.textContent > 1) {
    score.textContent--;
    displayMessage(+guess.value > secretNumber ? '⬆️ Too high' : '⤵️ Too Low');
    guess.value = '';
  } else {
    score.textContent = 0;
    displayMessage('You lost The Game');
    return;
  }
};
again.addEventListener('click', () => {
  score.textContent = 20;
  body.style.backgroundColor = '#222';
  chosen.style.width = '15rem';
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage('Start guessing...');
});

const handleCheck = () => {
  if (!guess.value) {
    displayMessage('⚠️ No Number Added');
  } else if (+guess.value === secretNumber) {
    guess.value = '';
    if (highscore.textContent < score.textContent) {
      highscore.textContent = score.textContent;
    }
    displayMessage('🥳 Correct Number');
    body.style.backgroundColor = 'green';
    chosen.style.width = '30rem';
  } else {
    condition();
  }
};

check.addEventListener('click', () => {
  handleCheck();
});
document.addEventListener("keydown", (event)=>{
  if (event.key === "Enter") {
    handleCheck();
  }
})