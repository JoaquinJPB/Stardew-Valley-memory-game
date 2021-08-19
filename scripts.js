
const cards = document.querySelectorAll('.memory-card');

let firstCard, secondCard;
let hasFlippedCard = false;

function flipCard(){
    this.classList.toggle('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        hasFlippedCard = false;
        secondCard = this;
        if (firstCard.dataset.stardew === secondCard.dataset.stardew) {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
        } else {
            setTimeout( () => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
            }, 1000);
        }
        
    }
}

cards.forEach(card => card.addEventListener('click', flipCard));
