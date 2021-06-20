// Enable button
function enableButton(index) {
  controller[index].disabled = false;
  controller[index].style.backgroundColor = "rgb(0,0,0,0)";
}

// Disable button
function disableButton(index) {
  controller[index].disabled = true;
  controller[index].style.backgroundColor = "black";
}

function enableSpeed(){
  speed1.disabled = false;
  speed2.disabled = false;
  speed3.disabled = false;
  speed4.disabled = false;
  speed5.disabled = false;
  speed6.disabled = false;
}

function disableSpeed(){
  speed1.disabled = true;
  speed2.disabled = true;
  speed3.disabled = true;
  speed4.disabled = true;
  speed5.disabled = true;
  speed6.disabled = true;
}

function determineSpeed(){
  if(speed1.checked == true){
    return 800;
  }
  else if(speed2.checked == true){
    return 400;
  }
  else if(speed3.checked == true){
    return 200;
  }
  else if(speed4.checked == true){
    return 100;
  }
  else if(speed5.checked == true){
    return 50;
  }
  else if(speed6.checked == true){
    return 25;
  }
}

// play button
function executePlay() {
  // Disable speed option
  disableSpeed();

  // Enable button pause
  enableButton(1);

  // Disable button play, nextmove, clear
  disableButton(0);
  disableButton(2);
  disableButton(3);

  looper = setInterval(executeNextMove, determineSpeed()); // do next move every .2 sec
}

// pause button
function executePause() {
  // Enable speed option
  enableSpeed();

  // Enable button play, next move, clear
  enableButton(0);
  enableButton(2);
  enableButton(3);

  // Disable button pause
  disableButton(1);

  // Clear interval, memberhentikan play
  clearInterval(looper);
}

// clear tm tape
function executeClear() {
  // tmTape to null and tapeCells to null
  tmTape.innerHTML = "";
  tapeCells = [];

  // Disable speed option
  disableSpeed();

  // Disable all buttons
  disableButton(0);
  disableButton(1);
  disableButton(2);
  disableButton(3);

  // Clear interval, memberhentikan play
  clearInterval(looper);

  // Change answer field
  let ansField = document.getElementById("ans");
  ansField.textContent = 0;
}

function move(newSymbol, arah, newState, isPushing) {
  if (isPushing) {
    // Tambah blank cell
    tapeCells.push(new Cell("B"));
  }

  // Change textContent
  tapeCells[it].changeTo(newSymbol);
  tmTape.childNodes[it].textContent = newSymbol;

  // Activate cell
  tmTape.childNodes[it].className += " active";
  tmTape.childNodes[it + 1].scrollIntoView();

  // Change state
  state = newState;

  // Ke Kanan or Ke Kiri or Stay
  if (arah == 1) {
    it++;
  } else if (arah == -1) {
    it--;
  }
}

function reachedEndState(){
  // Selesai
  executePause();
  tmTape.childNodes[it].className += " active";
  tmTape.childNodes[it].scrollIntoView();

  // Disable speed option
  disableSpeed();

  // Enable button clear
  enableButton(3);

  // Disable button play, pause, nextmove
  disableButton(0);
  disableButton(1);
  disableButton(2);

  // Show answer
  showAns();
}

let i; // iteration for loop
let curCell; // current cell
let it; // ++ kekanan, -- kekiri
let state; // state
let looper; // untuk play
let tapeCells = []; // Isi tape turing machine
const tmTape = document.getElementById("tmTape"); // Turing machine tape
const controller = document.querySelectorAll(".controller"); // Button controller
let speed1 = document.getElementById("025");
let speed2 = document.getElementById("050");
let speed3 = document.getElementById("100");
let speed4 = document.getElementById("200");
let speed5 = document.getElementById("400");
let speed6 = document.getElementById("800");
