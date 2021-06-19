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

// play button
function executePlay() {
  // Enable button pause
  enableButton(1);

  // Disable button play, nextmove, clear
  disableButton(0);
  disableButton(2);
  disableButton(3);

  looper = setInterval(executeNextMove, 200); // do next move every .2 sec
}

// pause button
function executePause() {
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

let i; // iteration for loop
let curCell; // current cell
let it; // ++ kekanan, -- kekiri
let state; // state
let looper; // untuk play
let tapeCells = []; // Isi tape turing machine
const tmTape = document.getElementById("tmTape"); // Turing machine tape
const controller = document.querySelectorAll(".controller"); // Button controller
