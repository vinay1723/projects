'use strict';

/*console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = '😂 Correct Number';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

console.log(document.querySelector('.guess').value);
document.querySelector('.guess').value = 23;*/

const secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.score').textContent = score;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  // when there is no input
  if (!guess) {
    displayMessage('⚠️ No number');
  } else if (guess === secretNumber) {
    displayMessage('🎉Correct Number');
    document.querySelector('.number').textContent = secretNumber;

    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too High!' : '📉 Too low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('💥You lost the Game');
    }
  } //else if (guess > secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = '📈 Too High!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = '💥You lost the Game';
  //     document.querySelector('.score').textContent = score;
  //   }
  // } else if (guess < secretNumber) {
  //   document.querySelector('.message').textContent = '📉 Too low!';
  //   score--;
  //   document.querySelector('.score').textContent = score;
  // }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';

  document.querySelector('.guess').textContent = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
