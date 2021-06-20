let num1 = document.getElementById("num1");     // Number 1
let num2 = document.getElementById("num2");     // Number 2

// tampilkan tape
function execute() {
    // jika kondisi terpenuhi
    if (num1.value && num2.value && parseInt(num1.value) >= 0 && parseInt(num2.value) >= 0) {
        // Clear
        executeClear();

        // Enable speed option
        enableSpeed();

        // Enable button play, nextmove, clear
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

// Show answer
function showAns() {
    // Penjumlahan
    let ans = +num1.value + +num2.value;
    
    // Menampilkan jawaban
    let ansField = document.getElementById("ans");
    ansField.textContent = ans;
}

// next move button
function executeNextMove() {
    // Penjumlahan
    // if exist
    if (tapeCells[0]) {
        // Deactivate 
        curCell = document.getElementsByClassName("active");
        for (i = 0; i < curCell.length; i++) {
            curCell[i].className = curCell[i].className.replace(" active", "");
        }

        // STATE 0
        if (state == 0) {
            // 0, B / R to state 1
            if (tapeCells[it].symbol == "0") {
                move("B", 1, 1);
            }
            // C, B / R to state 5 
            else if (tapeCells[it].symbol == "C") {
                move("B", 1, 5);
            }
        }

        // STATE 1
        else if (state == 1) {
            // 0, 0 / R to state 1
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 1);
            }
            // C, C / R to state 2
            else if (tapeCells[it].symbol == "C") {
                move("C", 1, 2);
            }
        }

        // STATE 2
        else if (state == 2) {
            // 0, 0 / R to state 2
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 2);
            }
            // B, 0 / L to state 3
            else if (tapeCells[it].symbol == "B") {
                move("0", -1, 3, 1);
            }
        }

        // STATE 3
        else if (state == 3) {
            // 0, 0 / L to state 3
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 3);
            }
            // C, C / L to state 4
            else if (tapeCells[it].symbol == "C") {
                move("C", -1, 4);
            }
        }

        // STATE 4
        else if (state == 4) {
            // 0, 0 / L to state 4
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 4);
            }
            // B, B / R to state 0
            else if (tapeCells[it].symbol == "B") {
                move("B", 1, 0);
            }
        }

        // STATE 5 (FINAL STATE)
        else if (state == 5) {
            reachedEndState();
        }
    }
}