let num1 = document.getElementById("num1");     // Number 1
let num2 = document.getElementById("num2");     // Number 2

let i;          // iteration for loop
let curCell;    // current cell
let it;         // ++ kekanan, -- kekiri
let state;      // state
let looper;     // untuk play
let tapeCells = []; // Isi tape turing machine
const tmTape = document.getElementById("tmTape");// Turing machine tape
const controller = document.querySelectorAll(".controller");// Button controller

// After click = button
// Create TM blocks
function execute() {
    // Jika num1 dan num2 terisi
    if (num1.value && num2.value) {
        // Clear
        executeClear();

        // Enable button play, clear, nextmove
        enableButton(0);
        enableButton(2);
        enableButton(3);

        // Disable button pause
        disableButton(1);

        // Menambah blank symbol di awal
        tapeCells.push(new Cell("B"));
        tapeCells.push(new Cell("B"));
        tmTape.childNodes[1].className += " active";
        it = 2; // Awal head
        state = 0; // Awal state
        
        // Memasukkan 0 sejumlah num1
        for (i = 0; i < num1.value; i++) {
            tapeCells.push(new Cell("0"));
        }
        // Pembatas
        tapeCells.push(new Cell("C"));
        // Memasukkan 0 sejumlah num2
        for (i = 0; i < num2.value; i++) {
            tapeCells.push(new Cell("0"));
        }
        // Blank symbol di akhir tape
        tapeCells.push(new Cell("B"));
        tapeCells.push(new Cell("B"));
    }
}

// play button
function executePlay() {
    // also use fun scrollIntoView() to track active block
    // use childNodes fun to activate by adding active class
    // use setInterval(executeNextMove(), 500)

    // Enable button pause
    enableButton(1);

    // Disable button play, clear, nextmove
    disableButton(0);
    disableButton(2);
    disableButton(3);

    looper = setInterval(executeNextMove, 200); // do next move every .2 sec
}

// pause button
function executePause() {
    // Enable button play, clear, nextmove
    enableButton(0);
    enableButton(2);
    enableButton(3);

    // Disable button pause
    disableButton(1);

    // Clear interval, memberhentikan play
    clearInterval(looper);
}


// Clear TM
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

// Show answer
function showAns() {
    // Penjumlahan
    let ans = +num1.value + +num2.value;
    
    // Show answer on ans field
    let ansField = document.getElementById("ans");
    ansField.textContent = ans;
}

// Enable button
function enableButton(index) {
    controller[index].disabled = false;
}

// Disable button
function disableButton(index) {
    controller[index].disabled = true;
}

// next move button
function executeNextMove() {
    
    // Penjumlahan
        // Jika TM sudah terisi
    if (tapeCells[0]) {
        // Deactivate block
        curCell = document.getElementsByClassName("active");
        for (i = 0; i < curCell.length; i++) {
            curCell[i].className = curCell[i].className.replace(" active", "");
        }

        // STATE 0
        if (state == 0) {
            // 0, X / R
            if (tapeCells[it].symbol == "0") {
                // Change textContent
                tapeCells[it].changeTo("X");
                tmTape.childNodes[it].textContent = "X";

                // Activate block
                tmTape.childNodes[it].className += " active";
                tmTape.childNodes[it + 1].scrollIntoView(false);

                // Change state
                state = 1;

                // Ke kanan
                it++;
            }
            // C, B / R
            else if (tapeCells[it].symbol == "C") {
                // Change textContent
                tapeCells[it].changeTo("B");
                tmTape.childNodes[it].textContent = "B";

                // Activate block
                tmTape.childNodes[it].className += " active";
                tmTape.childNodes[it + 1].scrollIntoView(false);

                // Change state
                state = 5;

                // Ke kanan
                // it++;
            }
        }

        // STATE 1
        else if (state == 1) {
            // 0, 0 / R
            if (tapeCells[it].symbol == "0") {
                // Activate block
                tmTape.childNodes[it].className += " active";
                tmTape.childNodes[it + 1].scrollIntoView(false);

                // Ke kanan
                it++;
            }
            // C, C / R
            else if (tapeCells[it].symbol == "C") {
                // Activate block
                tmTape.childNodes[it].className += " active";
                tmTape.childNodes[it + 1].scrollIntoView(false);

                // Change state
                state = 2;

                // Ke kanan
                it++;
            }
        }

        // STATE 2
        else if (state == 2) {
            // 0, 0 / R
            if (tapeCells[it].symbol == "0") {
                // Activate block
                tmTape.childNodes[it].className += " active";
                tmTape.childNodes[it + 1].scrollIntoView(false);

                // Ke kanan
                it++;
            }
            // B, 0 / L
            else if (tapeCells[it].symbol == "B") {
                // Tambah blank block
                tapeCells.push(new Cell("B"));

                // Change textContent
                tapeCells[it].changeTo("0");
                tmTape.childNodes[it].textContent = "0";

                // Result
                tmTape.childNodes[it].className += " result";

                // Activate block
                tmTape.childNodes[it].className += " active";
                tmTape.childNodes[it + 1].scrollIntoView(false);

                // Change state
                state = 3;

                // Ke kiri
                it--;
            }
        }

        // STATE 3
        else if (state == 3) {
            // 0, 0 / L
            if (tapeCells[it].symbol == "0") {
                // Activate block
                tmTape.childNodes[it].className += " active";
                tmTape.childNodes[it - 1].scrollIntoView(false);

                // Ke kiri
                it--;
            }
            // C, C / L
            else if (tapeCells[it].symbol == "C") {
                // Activate block
                tmTape.childNodes[it].className += " active";
                tmTape.childNodes[it - 1].scrollIntoView(false);

                // Change state
                state = 4;

                // Ke kiri
                it--;
            }
        }

        // STATE 4
        else if (state == 4) {
            // 0, 0 / L
            if (tapeCells[it].symbol == "0") {
                // Activate block
                tmTape.childNodes[it].className += " active";
                tmTape.childNodes[it - 1].scrollIntoView(false);

                // Ke kiri
                it--;
            }
            // X, X / R
            else if (tapeCells[it].symbol == "X") {
                // Activate block
                tmTape.childNodes[it].className += " active";
                tmTape.childNodes[it - 1].scrollIntoView(false);

                // Change state
                state = 0;

                // Ke kanan
                it++;
            }
        }

        // STATE 5 (FINAL STATE)
        else if (state == 5) {
            // Selesai
            executePause();
            tmTape.childNodes[it].className += " active";
            tmTape.childNodes[it].scrollIntoView(false);

            // Enable button clear
            enableButton(2);

            // Disable button play, pause, nextmove
            disableButton(0);
            disableButton(1);
            disableButton(3);

            // Show answer in decimal
            showAns();
        }
    }
}