
const cards = document.querySelectorAll('.memory-card');
cards.forEach(card => card.addEventListener('click', flipCard));

let firstCard, secondCard;
let hasFlippedCard = false;

function flipCard(){
    this.classList.toggle('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    hasFlippedCard = false;
    secondCard = this;
    checkMatch();
}

function checkMatch(){
    let isMatch = firstCard.dataset.stardew === secondCard.dataset.stardew;
    isMatch ? disableFlipCards() : unflipCards();
}

function disableFlipCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

function unflipCards() {
    setTimeout( () => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
    }, 1000);
}

