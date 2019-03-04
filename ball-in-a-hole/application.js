//Zmienne z których będziemy korzystać
let ball= document.querySelector("#ball");
let container = document.getElementsByClassName("container")[0];
let holes = [];
let gameStart=false;
let score = 0;
let speedX = 0, speedY = 0;
let posX = 20, posY = 20;

//wyniki
window.addEventListener('deviceorientation', changePosition)
function start(){  

    //podstawowe rozpoczecie gry
    gameStart=true;
    createHoles();
    moveBall();
    
    //licznik punktów
    document.getElementById("start").hidden=true;
    counter = document.createElement('span'); 
    counter.classList.add("counter");
    counter.innerHTML="Score : "+score;
    container.appendChild(counter);
    console.log("game Started!");
    
}

function reset(){
    gameStart=true;
    //wyczyszczenie dołków
    for(i=container.childElementCount; i>0; i--){    

        if(container.childNodes[i].nodeName=="Div"){

            if(container.childNodes[i].id!=="ball"){
                
                container.removeChild(container.childNodes[i])
            }
        }
    }
    holes=[];

     // reset punktów
    score = 0;
    counter.innerHTML="Score: "+score;         

    posX = 20, posY = 20;
    createHoles();                  
    moveBall();     
    console.log("game Started!")
    document.getElementById("restart").hidden=true;
}

//zyroskop i poruszanie kulka
function changePosition(e){            
    speedX=e.gamma/45
    speedY=e.beta/45
}

// funkcja poruszania kulki
function moveBall(){                 
    //ograniczenia
    if(posX+speedX<window.innerWidth-50 && posX+speedX>0){  
        posX+=speedX;
        ball.style.left=posX+'px';        
    }
    if(posY+speedY<window.innerHeight-50 && posY+speedY>0){
        posY+=speedY;
        ball.style.top=posY+'px';        
    }
    //kolizje
    for(i=0;i<holes.length;i++) {
        if(posY<Math.floor(holes[i].style.top.slice(0,-2))+50&&posY>holes[i].style.top.slice(0,-2)){
            if(posX>holes[i].style.left.slice(0,-2)&&posX<Math.floor(holes[i].style.left.slice(0,-2))+50){
                if(holes[i].classList.contains("rightHole")){
                    holes[i].classList.remove("rightHole");
                    holes.forEach(e=>{if(e.classList.contains("temphole")){
                        e.classList.remove("temphole");
                        e.classList.add("hole");
                    }})
                    holes[i].classList.add("temphole");
                    score++
                    counter.innerHTML="Score: "+score;
                    randomGoodHole(i);
                }
                else if(holes[i].classList.contains("hole")){
                //koniec gry
                gameStart=false;
                let yourScore = window.prompt("Uzyskałeś "+score+" pkt, podaj imię !.");
                highscores.push([score,yourScore]);
                refreshHighScore()
                document.getElementById("restart").hidden=false;
            }
        }
    }
    };
    if(gameStart==true){
        window.requestAnimationFrame(moveBall)
    }
}

//Dodanie dziur w zależności od rozmiaru ekranu
function createHoles(){                                  
    for(i=2;i<(window.innerWidth/100);i++){
        let hole = document.createElement('div');
        hole.classList.add("hole");
        hole.style.left=100*i+Math.random()*75-95+'px';
        hole.style.top=Math.random()*(window.innerHeight-95)/2+'px';
        holes.push(hole);
        container.appendChild(hole);
    }
    for(i=2;i<(window.innerWidth/100);i++){
        let hole = document.createElement('div');
        hole.classList.add("hole");
        hole.style.left=100*i+Math.random()*75-95+'px';
        hole.style.top=Math.random()*(window.innerHeight)/2+window.innerHeight/2-100+'px';
        holes.push(hole);
        container.appendChild(hole);
    }
    checkHoles();
    randomGoodHole(1);
}

// Dodanie dobrej dziury
function randomGoodHole(i){                                 
    let goodHole = Math.floor(Math.random()*holes.length);
     // sprawdzanie czy dziura nie powstanie w uzytym juz miejscu
    if(goodHole ==i&&i<holes.length){i++;}                 
    else{i--;}
    holes[goodHole].classList.remove("hole");
    holes[goodHole].classList.add("rightHole")

} 

//pozbycie sie zlych dziur
function checkHoles(){                                    
    for(i=0;i<holes.length-1;i++){     
        for(j=i+1;j<holes.length;j++){
            if(holes[j].style.left.slice(0,-2)>holes[i].style.left.slice(0,-2)+75
            &&holes[j].style.top.slice(0,-2)>holes[i].style.top.slice(0,-2)+75){
                holes[j].style.top=holes[j].style.top.slice(0,-2)+50+'px';
                holes[j].style.left=holes[j].style.left.slice(0,-2)+50+'px';
            }
        }
    }
}     
                  