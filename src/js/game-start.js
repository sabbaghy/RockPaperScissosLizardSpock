/* -----------------------------------------------------------------------------------------
   logica del juego de rock paper  scissors lizard & Spock
------------------------------------------------------------------------------------------*/
const selectionBtns = document.getElementById('selections');
const main = document.getElementById('main');
const lastPlay = document.getElementById('data-results');
const compScore = document.getElementById('comp-score');
const yourScore = document.getElementById('your-score');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const tenthsOfSeconds = document.getElementById('tenthsOfSeconds');
const finalMsg = document.getElementById('gameResultsText');
const gameOver = document.getElementById('gameOver');
const playAgain = document.getElementById('playAgain');
const leave = document.getElementById('leave');
const intro = document.getElementById('intro');
const bestOf3 = document.getElementById('bestOf3');
const bestOf5 = document.getElementById('bestOf5');
const gameSetting = document.getElementById('form-play');
const msgErrors = document.getElementById('msg-errors');
let allowPlay = false;

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

let errors = [];
let timerUpdate;
let remainSeconds;
let remainRounds; 

// const btnSetting = document.getElementById('btn-setting')

const checkInputs = () =>{
   errors = [];
   let numberRounds;
   
   bestOf5.checked ? numberRounds = 3 : numberRounds = 2;
   const maxTime = document.getElementById('max-time').value;

   if(maxTime === null || maxTime === "" || maxTime < 3 ) {
      errors.push('Time should be greater than 2 and less than 120 seconds');
   } else {
      const maxTimeNumeric = parseInt(maxTime)
   }

   if (errors.length > 0) {
      return false;
   } else {
      return {numberRounds, maxTime}
   }
}

/* -----------------------------------------------------------------------------------------
   logica del juego de rock paper  scissors lizard & Spock
------------------------------------------------------------------------------------------*/
const gameStart = (parameter) => {

   intro.classList.remove('intro--show')
   compScore.textContent = '0';
   yourScore.textContent = '0';

   remainSeconds = parseInt(parameter.maxTime);
   remainRounds = parseInt(parameter.numberRounds);

   timer('start', remainSeconds);
}

const makeSelection = (mySelection) =>{
// genera la jugada del computador mediante la generacion de un numero random entre 0 y 4
   const computerSelection = randomSelection();

// determina si hay un ganador (retorna true si es ganador, si ambos son falso no hay ganador en ese raound)
   const youWin = isWinner(mySelection, computerSelection);
   const compWin = isWinner(computerSelection,mySelection);

   timer('stop', remainSeconds);

// muestra en pantalla la jugada de cada jugador e indica el resultado del round
   showWinner(youWin,compWin)
   showPlay(computerSelection,compWin);
   showPlay(mySelection,youWin);

// incrementa el score del ganador (en caso que alguno halla ganado ese round
   if(youWin) addScore(yourScore);
   if(compWin) addScore(compScore);

   // remainRounds--;

   if (parseInt(yourScore.innerText) >= remainRounds || parseInt(compScore.innerText) >= remainRounds) {
      gameOver.classList.add('gameOver--show');
         allowPlay = false;
      if ( parseInt(yourScore.innerText) > parseInt(compScore.innerText) ){
         finalMsg.innerHTML = `You wind, Congratulations <i class="fa fa-smile-o"></i>`;
      } else{
         if ( parseInt(yourScore.innerText) < parseInt(compScore.innerText) ){
            finalMsg.innerHTML = `You lost, Sorry <i class="fa fa-frown-o"></i>`;
         } else{
            finalMsg.innerHTML = `Draw <i class="fa fa-meh-o"></i>`;
         }
      }
   } else {
      timer('start', remainSeconds);
   }
}

const addScore = (score) => {
   score.innerText = parseInt(score.innerText) + 1;
}

const showPlay = (selection, winner) => {
   const currentPlay = document.createElement('DIV');
   currentPlay.innerHTML  = `<img src="${selection.img}">`;
   currentPlay.classList.add("selection","selection--result");
   if (winner) {
      currentPlay.classList.add('winner');
   }
   lastPlay.insertAdjacentElement('afterbegin',currentPlay);
}

const showWinner = (you, compu) => {
   const resultPlay = document.createElement('div');
   if (you) {
      resultPlay.innerHTML  = `<p class="result-selection">You win</p>`;
   } else {
      if (compu) {
         resultPlay.innerHTML  = `<p class="result-selection">You lost</p>`;
      } else{
         resultPlay.innerHTML  = `<p class="result-selection"> Draw </p>`;
      }
   }
   lastPlay.insertAdjacentElement('afterbegin',resultPlay)
 }

const isWinner = (yourSelection, opponentSelection) => {
   return (yourSelection.beats[0] === opponentSelection.name || yourSelection.beats[1] === opponentSelection.name );
}

const randomSelection = () => {
   const computerIndex = Math.floor(Math.random() * arraySelections.length);
   return arraySelections[computerIndex];
}

function timer(action, remainSeconds) {
   if(action === 'start'){
      let time = remainSeconds * 10;

      timerUpdate = setInterval(()=>{
         time --;
         const min = ('0' + Math.floor(time / 600)).slice(-2);
         const sec = ('0' + Math.floor((time / 10) % 60)).slice(-2);
         const tenths = Math.floor((time) % 10);
         minutes.textContent = `${min}`;
         seconds.textContent = `${sec}`;
         tenthsOfSeconds.textContent = `${tenths}`;
         if(time < 1){
            gameOver.classList.add('gameOver--show')
            allowPlay = false;
            finalMsg.innerHTML = `You lost, time is over <i class="fa fa-frown-o"></i>`;
            clearInterval(timerUpdate)
         }
      }, 100);

   }
   if (action === 'stop'){
      clearInterval(timerUpdate)
   }
}

gameSetting.addEventListener('submit', (e)=>{
   e.preventDefault()
   
   const gameParameter = checkInputs()
   
   if (errors.length > 0) {
      let errorsList = ''; 
      errors.forEach(error => {
         errorsList += `<li>${error}</li>`
      })
      msgErrors.innerHTML = errorsList;
   } else {
      allowPlay = true;
      gameStart(gameParameter);
   }
})

playAgain.addEventListener('click',(e)=>{
   intro.classList.add('intro--show');
   compScore.textContent = '0';
   yourScore.textContent = '0';
   lastPlay.innerHTML = '';
   clearInterval(timerUpdate)
   allowPlay = false;

   // location.reload();
   gameOver.classList.remove('gameOver--show')
})

leave.addEventListener('click',(e)=>{
      window.close();
})

// al hacer click en alguna de la 5 jugadas (imagenes [Rock, Paper, Scissors, Lizard, Spock])
selectionBtns.addEventListener('click', (e) => {
   if (allowPlay){
      const selectionName = e.target.id;
      const objectSelection = arraySelections.find(selection => selection.name === selectionName)
      makeSelection(objectSelection);
   }
})