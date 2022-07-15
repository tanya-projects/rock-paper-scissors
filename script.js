'use strict';
// Loading screen
// Your turn - choose item.
// Simultaneously your item and random opponent item are animated
//

// MAIN VARIABLES
const loading = document.querySelector('.loading');
const itemsContainer = document.querySelectorAll('.items--container');
const opponentItems = document.querySelectorAll('.item--opponent');
const youItems = document.querySelectorAll('.item--you');
const gameRound = document.querySelector('.game--round');
const roundResult = document.querySelector('.winner--round');
const nextRound = document.querySelector('.btn--next');
const opponentLifes = document.querySelectorAll('.life--opponent');
const yourLifes = document.querySelectorAll('.life--you');
const totalResult = document.querySelector('.total--result');
const totalResultText = document.querySelector('.total--result-text');
const gameScreen = document.querySelector('.game--screen');
const newGame = document.querySelector('.new--game');

// STORE VARIABLES
const timeChooseItemAnimation = '0.5s';

// Life lose variables
let yourLife = 0;
let opponentLife = 0;

// Hide loading screen
setTimeout(`loading.classList.add('hidden')`, 2500);

// FUNCTIONS
const addAnimation = function (element, animationName, time, howtoend, style) {
  element.style.animation = `${animationName} ${time} ${howtoend} ${style}`;
  // add class for define clicked items
  element.classList.add('.animated');
};

const randomItem = function () {
  const i = Math.floor(Math.random() * 3);
  addAnimation(
    opponentItems[i],
    'opponentChooseItem',
    timeChooseItemAnimation,
    'forwards',
    'linear'
  );
  return opponentItems[i];
};

const toNextRound = function () {
  // Allow clicking on items
  youItems.forEach((it) => (it.style.pointerEvents = 'auto'));
  // return choosed items
  youItems.forEach((yItem) => {
    if (yItem.classList.contains('.animated')) {
      addAnimation(
        yItem,
        'youReturnItem',
        timeChooseItemAnimation,
        'forwards',
        'linear'
      );
    }
  });
  opponentItems.forEach((oppItem) => {
    if (oppItem.classList.contains('.animated')) {
      addAnimation(
        oppItem,
        'opponentReturnItem',
        timeChooseItemAnimation,
        'forwards',
        'linear'
      );
    }
  });

  // Hide game round screen
  setTimeout(`gameRound.classList.add('hidden')`, 400);
  addAnimation(gameRound, 'hideOpacity', '0.5s', 'forwards', 'linear');
};

const startNewGame = function () {
  addAnimation(totalResult, 'hideOpacity', '1.4s', 'forwards', 'linear');
  setTimeout(`totalResult.classList.add('hidden')`, 1500);
  setTimeout(`gameScreen.classList.remove('hidden')`, 1300);
  addAnimation(gameScreen, 'showOpacity', '1.5s', 'forwards', 'linear');
  toNextRound();
  opponentLifes.forEach((l) => {
    l.attributes.src.value = 'img/life-opponent.png';
  });
  yourLifes.forEach((l) => {
    l.attributes.src.value = 'img/life-you.png';
  });
};

// CLICK ON ITEM
youItems.forEach((yItem) =>
  yItem.addEventListener('click', function (e) {
    addAnimation(
      yItem,
      'youChooseItem',
      timeChooseItemAnimation,
      'forwards',
      'linear'
    );
    let oppItem = randomItem();

    // Show round result and next btn (if not third chsnge text on button)
    gameRound.classList.remove('hidden');
    addAnimation(gameRound, 'showOpacity', '1s', 'forwards', 'linear');

    // Possible results
    if (
      oppItem.attributes.data_winrule.nodeValue ===
      yItem.attributes.data_winrule.nodeValue
    ) {
      roundResult.textContent = 'NO ONE WINS';
    } else if (
      yItem.attributes.data_winrule.nodeValue ===
      oppItem.attributes.data_loserule.nodeValue
    ) {
      roundResult.textContent = 'YOU WIN';
      opponentLifes[opponentLife].attributes.src.value = 'img/life-lost.png';
      opponentLife++;
    } else if (
      oppItem.attributes.data_winrule.nodeValue ===
      yItem.attributes.data_loserule.nodeValue
    ) {
      roundResult.textContent = 'YOU LOSE';
      yourLifes[yourLife].attributes.src.value = 'img/life-lost.png';
      yourLife++;
    }
    // Stop click on items right after click in item
    youItems.forEach((it) => (it.style.pointerEvents = 'none'));

    // Go total result
    if (yourLife === 3 || opponentLife === 3) {
      totalResultWindow();
      yourLife = 0;
      opponentLife = 0;
    }
  })
);

// Click on next round
nextRound.addEventListener('click', toNextRound);

const totalResultWindow = function () {
  addAnimation(gameScreen, 'hideOpacity', '2.1s', 'forwards', 'linear');
  setTimeout(`gameScreen.classList.add('hidden')`, 2000);
  setTimeout(`totalResult.classList.remove('hidden')`, 2000);
  yourLife === 3
    ? (totalResultText.textContent = 'YOU LOSE ALL LIFES')
    : (totalResultText.textContent = 'YOU BEAT YOUR OPPONENT');
};

// SET NEW GAME
newGame.addEventListener('click', startNewGame);
