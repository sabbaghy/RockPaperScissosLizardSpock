
/* -----------------------------------------------------------------------------------------
   logica del juego de rock paper  scissors lizard & Spock
------------------------------------------------------------------------------------------*/
/*

const selectionBtns = document.querySelectorAll('.selection');
const lastPlay = document.getElementById('round-result');
const compScore = document.getElementById('comp-score');
const yourScore = document.getElementById('your-score');

const arraySelections = [
   {
      name: 'rock',
      img: 'assets/img/rock.png',
      beats: ['scissors', 'lizard']
   },
   {
      name: 'scissors',
      img: 'assets/img/scissors.png',
      beats: ['paper', 'lizard']
   },
   {
      name: 'paper',
      img: 'assets/img/paper.png',
      beats: ['rock', 'spock']
   },
   {
      name: 'spock',
      img: 'assets/img/spock.png',
      beats: ['scissors', 'rock']
   },
   {
      name: 'lizard',
      img: 'assets/img/lizard.png',
      beats: ['paper', 'spock']
   }
]

// al hacer click en alguna de la 5 jugadas (imagenes [Rock, Paper, Scissors, Lizard, Spock])
selectionBtns.forEach(selectionBtn => {
   selectionBtn.addEventListener('click', (e) =>{
      const selectionName = e.target.id;
      const objectSelection = arraySelections.find(selection => selection.name === selectionName)
      makeSelection(objectSelection);
   })
}) 

const makeSelection = (mySelection) =>{

// genera la jugada del computador mediante la generacion de un numero random entre 0 y 4
   const computerSelection = randomSelection();

// determina si hay un ganador (retorna true si es ganador, si ambos son falso no hay ganador en ese raound)
   const youWin = isWinner(mySelection, computerSelection);
   const compWin = isWinner(computerSelection,mySelection);

// muestra en pantalla la jugada de cada jugador e indica el resultado del round
   showWinner(youWin,compWin)
   showPlay(computerSelection,compWin);
   showPlay(mySelection,youWin);

// incrementa el score del ganador (en caso que alguno halla ganado ese round
   if(youWin) addScore(yourScore);
   if(compWin) addScore(compScore);
}


const addScore = (score) => {
   score.innerText = parseInt(score.innerText) + 1;
}

const showPlay = (selection, winner) => {
   const currentPlay = document.createElement('div');
   currentPlay.innerHTML  = `<div class="selection selection--result"><img src="${selection.img}"></div>`;
 
   currentPlay.classList.add('result-selection');
   if (winner) {
      currentPlay.classList.add('winner');
   }
   lastPlay.after(currentPlay)
}

const showWinner = (you, compu) => {
   const resultPlay = document.createElement('div');
   if (you) {
      resultPlay.innerHTML  = `<p class="result-selection">You win</p>`;
   } else {
      if (compu) {
         resultPlay.innerHTML  = `<p class="result-selection">You lost</p>`;
      } else{
         resultPlay.innerHTML  = `<p class="result-selection"> Tie</p>`;
      }
   }
      lastPlay.after(resultPlay)

 }


const isWinner = (yourSelection, opponentSelection) => {
 return (yourSelection.beats[0] === opponentSelection.name || yourSelection.beats[1] === opponentSelection.name );
}

const randomSelection = () => {
   const computerIndex = Math.floor(Math.random() * arraySelections.length);
   return arraySelections[computerIndex];
}

*/