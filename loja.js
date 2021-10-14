$(document).ready(function(){
            
    if(!localStorage.getItem("Orpimento")) 
        localStorage.setItem("Orpimento",'0');

    if(!localStorage.getItem("Gato")) 
        localStorage.setItem("Gato",'0');

    if(!localStorage.getItem("Junimo Roxo")) 
        localStorage.setItem("Junimo Roxo",'0');

    if(!localStorage.getItem('mochila')) 
        localStorage.setItem('mochila','0');

    atualizaValorHtml();

    var valorOrpimento = 8;
    var valorGato = 2;
    var valorJunimo = 4;

    $('#orpimento').click(function(){
        var teste = '#titulo-orpimento';
        var descricaoValor = "#valor-orpimento";
        comprarBoosters(teste);
    });
    $('#gato').click(function(){
        var teste = '#titulo-gato';
        var descricaoValor = "#valor-gato";
        comprarBoosters(teste);
    });
    $('#junimo').click(function(){
        var teste = '#titulo-junimo';
        var descricaoValor = "#valor-junimo";
        comprarBoosters(teste);
    });

    function comprarBoosters(teste, descricaoValor){

        var itemSelecionado = $(teste).html();
        
        if(verificaMochila(itemSelecionado)){

            var resultado = confirm("Deseja comprar o item: " + itemSelecionado + "?");

            if(resultado == true) 
                atualizaStorage(itemSelecionado, descricaoValor);

        }else alert("Não há moedas suficientes para comprar este item.");
    };

    function atualizaStorage(itemSelecionado, descricaoValor){

        var valor = localStorage.getItem(itemSelecionado);
        valor = parseInt(valor) + 1;

        var valorStorage = String(valor);
        localStorage.setItem(itemSelecionado, valorStorage);   

        $(descricaoValor).html(valor);

        alert("O item " + itemSelecionado + " foi comprado com sucesso!");

        atualizaValorHtml();
    };

    function atualizaValorHtml(){
        $("#valor-orpimento").html(localStorage.getItem("Orpimento"));
        $("#valor-gato").html(localStorage.getItem("Gato"));
        $("#valor-junimo").html(localStorage.getItem("Junimo Roxo"));
        $("#valor-mochila").html(localStorage.getItem("mochila"));
    };

    function verificaMochila(itemSelecionado){
        if(itemSelecionado == 'Orpimento'){

            if(localStorage.getItem('mochila') >= valorOrpimento){
                var valor = localStorage.getItem('mochila');
                valor = valor - valorOrpimento;
                var valorStorage = String(valor);
                localStorage.setItem('mochila', valorStorage);

                return(true);

            }else return(false);

        }else if(itemSelecionado == 'Gato'){

            if(localStorage.getItem('mochila') >= valorGato){
                var valor = localStorage.getItem('mochila');
                valor = valor - valorGato;
                var valorStorage = String(valor);
                localStorage.setItem('mochila', valorStorage);

                return(true);

            }else return(false);

        }else if(itemSelecionado == 'Junimo Roxo'){

            if(localStorage.getItem('mochila') >= valorJunimo){
                var valor = localStorage.getItem('mochila');
                valor = valor - valorJunimo;
                var valorStorage = String(valor);
                localStorage.setItem('mochila', valorStorage);

                return(true);

            }else return(false);

        }else alert('Error: 420 - Item Selecionado não esperado.');

        return(false);
    };
    
    alert('Clique na imagem dos personagens para comprá-los.');
});