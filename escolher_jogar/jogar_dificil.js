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

let totalmoedas = 0;
let moedas = document.querySelector('#moedas')

let numeroJogadas = 0;

let boosterOrpimento = 0;
let countTime = 0;


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

        if (cardsEncontrados === 18) { 
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
    pontoslevel = 20
    if(boosterOrpimento != 1){
        iniciopontuacao = iniciopontuacao + pontoslevel;
    }
    else{iniciopontuacao = iniciopontuacao + (pontoslevel*2)}
    pontos.textContent = `${iniciopontuacao}`;
}

if(!localStorage.getItem('mochila')) 
        localStorage.setItem('mochila','0');

function atualizamoedas() {
    totalmoedas = totalmoedas+1;
    moedas.textContent = `${totalmoedas}`;

    var valorMoeda = localStorage.getItem('mochila');
    valorMoeda = parseInt(valorMoeda) + 1;
    var valorStorage = String(valorMoeda);
    localStorage.setItem('mochila', valorStorage);
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
        iniciopontuacao = iniciopontuacao + 150;
        pontuacao();
        atualizamoedas();
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
        window.location = '../Ranking/adicionarNomeRanking.html?pontos='+iniciopontuacao
    seg = 100000;
}


cards.forEach(card => card.addEventListener('click', flipCard));

function boosterViraDuasCartas() {
    var cartas = document.getElementsByClassName("memory-card");
    var aux = cartas;
    var cartasviradas = 0;
    for (countcartas = 0; countcartas < cartas.length; countcartas++) {
         if (cartas[countcartas].className != "memory-card flip" )
          for (countaux = 0; countaux < aux.length && cartasviradas <3; countaux++) {
             if (aux[countaux].className != "memory-card flip" && countaux != countcartas ){
                    cartas[countcartas].click()
                    aux[countaux].click()
                    cartasviradas ++;
             }
                
         }
     }
 }

//a partir daqui: resolução dos boosters

$(".valor-orpimento").html(localStorage.getItem("Orpimento"));
$(".valor-gato").html(localStorage.getItem("Gato"));
$(".valor-junimo").html(localStorage.getItem("Junimo Roxo"));

$('.orpimento').click(function(){
    if(localStorage.getItem('Orpimento')>0){
        //dobra a quantidade de pontos por par por 10 segundos
        boosterOrpimento = 1;
        var valor = localStorage.getItem('Orpimento');
        valor = parseInt(valor) - 1;
        var valorStorage = String(valor);
        localStorage.setItem('Orpimento', valorStorage);
        
        $(".valor-orpimento").html(localStorage.getItem("Orpimento"));

    }else alert("Você não tem este booster. Compre na loja para utilizá-lo!");
});

$('.gato').click(function(){
    if(localStorage.getItem('Gato')>0){
        //mostra 2 pares
        boosterViraDuasCartas();
        var valor = localStorage.getItem('Gato');
        valor = parseInt(valor) - 1;
        var valorStorage = String(valor);
        localStorage.setItem('Gato', valorStorage);
        
        $(".valor-gato").html(localStorage.getItem("Gato"));

    }else alert("Você não tem este booster. Compre na loja para utilizá-lo!");
});

$('.junimo').click(function(){
    if(localStorage.getItem('Junimo Roxo')>0){
        //aumenta 5 segundos no tempo
        seg = seg + 5;
        
        var valor = localStorage.getItem('Junimo Roxo');
        valor = parseInt(valor) - 1;
        var valorStorage = String(valor);
        localStorage.setItem('Junimo Roxo', valorStorage);

        $(".valor-junimo").html(localStorage.getItem("Junimo Roxo"));

    }else alert("Você não tem este booster. Compre na loja para utilizá-lo!");
});