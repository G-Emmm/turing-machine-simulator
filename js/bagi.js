let num1 = document.getElementById("num1");     // Number 1
let num2 = document.getElementById("num2");     // Number 2

// tampilkan tape
function execute() {
    // jika kondisi terpenuhi
    if (num1.value && num2.value && num1.value >= 0 && num2.value >= 0) {
        // Clear
        executeClear();

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
        // Pembatas
        tapeCells.push(new Cell("C"));
        // Blank symbol di akhir tape
        tapeCells.push(new Cell("B"));
        tapeCells.push(new Cell("B"));
    }
}

// Show answer
function showAns() {
    // Pembagian
    let ans = num1.value / num2.value;
    
    // Menampilkan jawaban
    let ansField = document.getElementById("ans");
    ansField.textContent = ans;
}

// next move button
function executeNextMove() {
    // Pembagian
    // if exist
    if (tapeCells[0]) {
        // Deactivate 
        curCell = document.getElementsByClassName("active");
        for (i = 0; i < curCell.length; i++) {
            curCell[i].className = curCell[i].className.replace(" active", "");
        }

        // STATE 0
        if (state == 0) {
            // 0/0,R to state 0
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 0);
            }
            // C/C,R to state 1
            else if (tapeCells[it].symbol == "C") {
                move("C", 1, 1);
            }
        }

        // STATE 1
        else if (state == 1) {
            // 0 / 0, R to state 1
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 1);
            }
            // C/C,L to state 2
            else if (tapeCells[it].symbol == "C") {
                move("C", -1, 2);
            }
        }

        // STATE 2
        else if (state == 2) {
            // 0 / X, L to state 3
            if (tapeCells[it].symbol == "0") {
                move("X", -1, 3);
            }
            // C / C, R to state 7
            else if (tapeCells[it].symbol == "C") {
                move("C", 1, 7);
            }
        }

        // STATE 3
        else if (state == 3) {
            // 0 / 0, L to state 3
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 3);
            }
            // C / C, L to state 4
            else if (tapeCells[it].symbol == "C") {
                move("C", -1, 4);
            }
        }

        // STATE 4
        else if (state == 4) {
            // Y / Y, L to state 4
            if (tapeCells[it].symbol == "Y") {
                move("Y", -1, 4);
            }
            // 0/Y,R to state 5
            else if (tapeCells[it].symbol == "0") {
                move("Y", 1, 5);
            }
            // B / B, R to state 10
            else if (tapeCells[it].symbol == "B") {
                move("B", 1, 10);
            }        
        }

        // STATE 5
        else if (state == 5) {
            // Y/Y,R to state 5
            if (tapeCells[it].symbol == "Y") {
                move("Y", 1, 5);
            }
            // C/C,R to state 6
            else if (tapeCells[it].symbol == "C") {
                move("C", 1, 6);
            }
        }

        // STATE 6
        else if (state == 6) {
            // 0/0,R to state 6
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 6);
            }
            // X/X,L to state 2
            else if (tapeCells[it].symbol == "X") {
                move("X", -1, 2);
            }
        }

        // STATE 7
        else if (state == 7) {
            // X/0,R to state 7
            if (tapeCells[it].symbol == "X") {
                move("0", 1, 7);
            }
            // C/C,R to state 8
            else if (tapeCells[it].symbol == "C") {
                move("C", 1, 8);
            }
        }

        // STATE 8
        else if (state == 8) {
            // 0/0,R to state 8
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 8);
            }
            // B/0,L to state 9
            else if (tapeCells[it].symbol == "B") {
                move("0", -1, 9, 1);
            }
        }

        // STATE 9
        else if (state == 9) {
            // 0/0,L to state 9
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 9);
            }
            // C/C,L to state 2
            else if (tapeCells[it].symbol == "C") {
                move("C", -1, 2);
            }
        }

        // STATE 10
        else if (state == 10) {
            // Y/B,R to state 10
            if (tapeCells[it].symbol == "Y") {
                move("B", 1, 10);
            }
            // C/B,R to state 11
            else if (tapeCells[it].symbol == "C") {
                move("B", 1, 11);
            }
        }

        // STATE 11
        else if (state == 11) {
            // 0/B,R to state 11
            if (tapeCells[it].symbol == "0") {
                move("B", 1, 11);
            }
            // X/B,R to state 11
            else if (tapeCells[it].symbol == "X") {
                move("B", 1, 11);
            }
            // C/B,R to state 12
            else if (tapeCells[it].symbol == "C") {
                move("B", 1, 12);
            }
        }

        // STATE 12 (FINAL STATE)
        else if (state == 12) {
            // Selesai
            executePause();
            tmTape.childNodes[it].className += " active";
            tmTape.childNodes[it].scrollIntoView();

            // Enable button clear
            enableButton(3);

            // Disable button play, pause, nextmove
            disableButton(0);
            disableButton(1);
            disableButton(2);

            // Show answer
            showAns();
        }
    }
}