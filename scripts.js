const cards = document.querySelectorAll('.memory-card');

let flipping = false;
let a = false;
let first, second;

function flipCard() {
  if (a) return;
  if (this === first) return;

  this.classList.add('flip');

  if (!flipping) {
    flipping = true;
    first = this;

    return;
  }
  second = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = first.dataset.framework === second.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  first.removeEventListener('click', flipCard);
  second.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  a = true;

  setTimeout(() => {
    first.classList.remove('flip');
    second.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [flipping, a] = [false, false];
  [first, second] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
