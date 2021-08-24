
const cards = document.querySelectorAll('.memory-card');
cards.forEach(card => card.addEventListener('click', flipCard));

let firstCard, secondCard;
let lockBoard = false;
let hasFlippedCard = false;
let score = 0;

function flipCard(){
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.toggle('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
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
    score++;
    winGame();
    resetBoard();
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function unflipCards() {
    lockBoard = true;
    setTimeout( () => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function winGame(){
    if (score == 10){
        Swal.fire({
            title: 'Congratulations you have found all pairs!',
            confirmButtonColor: '#fce304',
            icon: 'success',
            iconColor: '#fce304'
        });
    }
}

(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 25);
        card.style.order = randomPos;
    });
})();

