var pontos = document.querySelector('#pontos')
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('pontos');
pontos.textContent = `${myParam}`;   



const inputNomes = document.getElementById('nomes');

        document.getElementById('confirmar').addEventListener('click', function() {
        let nomes = new Array();
        let pontos = new Array();

        //Verifica se existe
        if (localStorage.hasOwnProperty("nomes")) {
            nomes = JSON.parse(localStorage.getItem("nomes"))
        }
        if (localStorage.hasOwnProperty("pontos")) {
            pontos = JSON.parse(localStorage.getItem("pontos"))
        }

        //Adiciona no array
        nomes.push({name: inputNomes.value})
        pontos.push({point: Math.round((Math.random() * (2000 - 200) + 200))});

        //Salva no storage
        localStorage.setItem("nomes", JSON.stringify(nomes))
        localStorage.setItem("pontos", JSON.stringify(pontos))

        //result.insertAdjacentHTML('beforeend', `<li>${inputNomes.value}`)
       
        window.location.href = "acessarRanking.html";
        });

        //Mostra array
        window.addEventListener("load", _ => {
            if (localStorage.hasOwnProperty("nomes")) {
                var nomesRanking = JSON.parse(localStorage.getItem("nomes"))
                var pontosRanking = JSON.parse(localStorage.getItem("pontos"))
                /*JSON.parse(localStorage.getItem("nomes")).forEach(
                    nomes => {result.insertAdjacentHTML('beforeend', `<li>${nomes.name}`)}
                    )*/
               


            }
            
        })

        