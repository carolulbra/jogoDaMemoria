var pontos = document.querySelector('#pontos')
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('pontos');
pontos.textContent = `${myParam}`;   