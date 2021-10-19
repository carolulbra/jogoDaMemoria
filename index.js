$(window).load(function() {
            
    if(localStorage.getItem("admin"))
        localStorage.removeItem("admin");
        
    if(!localStorage.getItem("admin")) 
        localStorage.setItem("admin", '0');


    function acessaAdmin(){
        var admin = event.keyCode;
        var adminStorage = localStorage.getItem("admin") + String(admin);

        localStorage.setItem("admin", adminStorage);

        var valor = 097100109105110;

        if(localStorage.getItem("admin") == valor){
            window.location.href = "admin/telaAdmin.html";
            localStorage.removeItem("admin");

        }else if(localStorage.getItem("admin") > valor) 
            localStorage.removeItem("admin");
    };
    document.body.onkeypress = acessaAdmin;


    /*admin
    97 = a
    100 = d
    109 = m
    105 = i
    110 = n
    */
    var largura;
    var altura;
    var larguraMenu = 400;
    var alturaMenu = 300;
    var divisor = 2;

    canvas = document.getElementById("canvasMenu");
    ctx = canvas.getContext("2d");

    function atualizarPlanoDeFundo() {
        largura = window.innerWidth;
        altura = window.innerHeight;
        canvas.setAttribute("width", largura);
        canvas.setAttribute("height", altura);
        var img = new Image();
        img.src = "images/index/wallpaper.png";
        ctx.drawImage(img, 0, 0);
    }

    function desenharBaseMenu() {
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        var x = parseInt((largura / divisor) - (larguraMenu / divisor));
        var y = parseInt((altura / divisor) - (alturaMenu / divisor));
        ctx.fillRect(x, y, larguraMenu, alturaMenu);
    }

    function desenharItensMenu() {
        var x = parseInt((largura / divisor) - (larguraMenu / divisor));
        var y = parseInt((altura / divisor) - (alturaMenu / divisor));
        var img;

        img = new Image();
        img.src = "images/index/iniciar_1.png";
        ctx.drawImage(img, x, y);

        img = new Image();
        img.src = "images/index/ranking_1.png";
        ctx.drawImage(img, x, y + 100);

        img = new Image();
        img.src = "images/index/loja_1.png";
        ctx.drawImage(img, x, y + 200);
    }

    function selecionarItem(indice) {
        desenharMenu();
        var x = parseInt((largura / divisor) - (larguraMenu / divisor));
        var y = parseInt((altura / divisor) - (alturaMenu / divisor));
        var img;
        img = new Image();
        switch (indice) {
            case 0:                        
                img.src = "images/index/iniciar_2.png";
                ctx.drawImage(img, x, y);
                break;
            case 1:
                img.src = "images/index/ranking_2.png";
                ctx.drawImage(img, x, y+ 100);
                break;
            case 2:
                img.src = "images/index/loja_2.png";
                ctx.drawImage(img, x-2, y + 181);
                break;
        }
    }

    function desenharMenu() {
        atualizarPlanoDeFundo();
        desenharBaseMenu();
        desenharItensMenu();
    }

    window.onresize = function () {
        desenharMenu();
    }

    window.onmousemove = function () {
        var posX = event.clientX;
        var posY = event.clientY;
        var x = parseInt((largura / divisor) - (larguraMenu / divisor));
        var y = parseInt((altura / divisor) - (alturaMenu / divisor));
        var indice = -1;

        if (posX > x && posX < x + larguraMenu) {
            if (posY > y && posY < y + alturaMenu) {
                indice = parseInt((posY - y) / 100);                        
            }
        }

        selecionarItem(indice);
    }
    
    //seguindo a mesma lógica do evento onmousemove e da função selecionarItem

    function clicarItem(indice) {
        desenharMenu();
        var x = parseInt((largura / divisor) - (larguraMenu / divisor));
        var y = parseInt((altura / divisor) - (alturaMenu / divisor));
        var img;
        img = new Image();
        var menu;
        menu = indice;
        console.log(menu);
        if(menu == 0)                       
            window.location.href = "escolher_jogar/escolher_nivel.html";
        else if(menu == 1)
            window.location.href = "Ranking/acessarRanking.html";
        else if(menu == 2)
            window.location.href = "loja.html";
        else alert("Error - indice incorreto!");
    };

    window.onclick = function () {
        var posX = event.clientX;
        var posY = event.clientY;
        var x = parseInt((largura / divisor) - (larguraMenu / divisor));
        var y = parseInt((altura / divisor) - (alturaMenu / divisor));
        var indice = -1;

        if (posX > x && posX < x + larguraMenu) {
            if (posY > y && posY < y + alturaMenu) {
                indice = parseInt((posY - y) / 100);                        
            }
        }
        clicarItem(indice);
    }

    desenharMenu();
    
    var listcards = ['abigail.png',"Anao.png",'caroline.png','Demetrius.png','feiticeiro.png','Gunther.png','Jodi.png','Knet.png','krobus.png','Linus.png','Marlon.png','Maru.png','Morris.png','pierre.png','robin.png','Sam.png','Sebastian.png','Sr.Qi.png'];


    for ( let i = 1, len = listcards.length; i <= len; i++ ) {
        
        position = Math.floor(Math.random() * listcards.length);
        if(!localStorage.getItem("imagemCarta"+i)) // verificar se nessa posição já existe uma carta
            localStorage.setItem("imagemCarta"+i, listcards[position] );
            listcards.splice(position,1);// remove carta da lista para não repetir
    }
});

