const cards = document.querySelectorAll('.memory-card');


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let cardsEncontrados = 0;

let currentTimer;
let seg = document.getElementById('time').value;
let timer = document.querySelector('#timer');

let iniciopontuacao = 0;
let pontos = document.querySelector('#pontos')

let numeroJogadas = 0;


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;
    checkForMatch();
}


function checkForMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        //function pontuou() {
        //    infoPontos.innerHTML = 'Pontuação: \n';
        //}
        cardsEncontrados++;

        if (cardsEncontrados === 8) {
            reset();
            return;
        }
        pontuacao();
        disableCards();
        return;
    }

    unflipCards();
}

function pontuacao() {
    iniciopontuacao = iniciopontuacao + 10;
    pontos.textContent = `${iniciopontuacao}`;
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}


function reset() {
    //lockBoard = true;
    setTimeout(() => {
        cardsEncontrados = 0;
        iniciopontuacao = iniciopontuacao + 40;
        pontuacao();
        seg = 45;
        cards.forEach(card => card.classList.remove('flip'));
        [hasFlippedCard, lockBoard] = [false, false];
        cards.forEach(card => [card] = [null]);
        cards.forEach(card => card.addEventListener('click', flipCard));
        (function shuffle() {
            cards.forEach((card) => {
                let randomPosition = Math.floor(Math.random() * 12);
                card.style.order = randomPosition;
            })
        })();
    }, 800);
}


function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 800);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 4);
        card.style.order = randomPos;
    });
})();


currentTimer = setInterval(() => {
    if (seg < 0)
        finalizarJogo(flag = 1);
    timer.textContent = `${seg}`;
    seg--;
}, 1000);

function finalizarJogo(flag) {
    if (flag === 1)
        window.location = '../Ranking/adicionarNomeRanking.html'
    seg = 100000;
}


cards.forEach(card => card.addEventListener('click', flipCard));