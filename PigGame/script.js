'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');
let p0Score = document.querySelector('#score--0');
let p1Score = document.querySelector('#score--1');
let p0Current = document.querySelector('#current--0');
let p1Current = document.querySelector('#current--1');
let current = 0;
let activePlayer = 0;
const scores = [0, 0];
const starting = () => {
  p0Score.textContent = 0;
  p1Score.textContent = 0;
  p0Current.textContent = 0;
  p1Current.textContent = 0;
  activePlayer = 0;
  player0.classList.add('player--active');
    player1.classList.remove('player--active');
};
starting();
newGame.addEventListener('click', () => {
  starting();
});
const switchPlayer = ()=>{
    current = 0;
    document.getElementById(`current--${activePlayer}`).textContent = current;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}
rollDice.addEventListener('click', () => {
  let rand = Math.trunc(Math.random() * 6) + 1;

  dice.src = `dice-${rand}.png`;
  if (rand !== 1) {
    current += rand;
    document.getElementById(`current--${activePlayer}`).textContent = current;
  } else {
    switchPlayer();
  }
});

hold.addEventListener("click",()=>{
    scores[activePlayer] += current;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    switchPlayer();
})