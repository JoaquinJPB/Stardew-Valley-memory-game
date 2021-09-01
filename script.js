
const cards = document.querySelectorAll('.memory-card');
cards.forEach(card => card.addEventListener('click', flipCard));

const mutedButton = document.getElementById('muted');
mutedButton.addEventListener('click', muteSound);

let firstCard, secondCard;
let lockBoard = false;
let hasFlippedCard = false;
let muted = false;
let score = 0;

const audio = {
    flipCardSound : new Audio("audio/card-flip-sound-effect.mp3"),
    rightPair : new Audio("audio/correct-answer-sound-effect.mp3"),
    wrongPair : new Audio("audio/wrong-pair.mp3"),
    winSound : new Audio("audio/stardew_valley_town.mp3")
    };

function flipCard(){
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.toggle('flip');
    if (muted == false){
        audio.flipCardSound.play();
    }
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
    if (muted == false){
        audio.rightPair.play();
    }
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
        if (muted == false){
            audio.wrongPair.play();
        }
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function winGame(){
    if (score == 10){
        Swal.fire({
            title: 'Congratulations you have found all pairs!',
            confirmButtonColor: '#2fb946',
            icon: 'success',
            iconColor: '#2fb946'
        });
        setTimeout( () => {audio.winSound.play()},1000);
    }
}

function muteSound() {
    muted = true;
}

(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 25);
        card.style.order = randomPos;
    });
})();

