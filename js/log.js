let num1 = document.getElementById("num1");     // Number 1

// tampilkan tape
function execute() {
    // jika kondisi terpenuhi
    if (num1.value && num1.value >= 0) {
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
        
        // Memasukkan 1 sejumlah num1
        for (i = 0; i < num1.value; i++) {
            tapeCells.push(new Cell("1"));
        }
        tapeCells.push(new Cell("B"));
        tapeCells.push(new Cell("B"));
    }
}

// Show answer
function showAns() {
    // Log
    let ans = Math.ceil(Math.log2(num1.value));
    
    // Menampilkan jawaban
    let ansField = document.getElementById("ans");
    ansField.textContent = ans;
}

// next move button
function executeNextMove() {
    // Log
    // if exist
    if (tapeCells[0]) {
        // Deactivate 
        curCell = document.getElementsByClassName("active");
        for (i = 0; i < curCell.length; i++) {
            curCell[i].className = curCell[i].className.replace(" active", "");
        }

        // STATE 0
        if (state == 0) {
            // 1/1,R to state 1
            if (tapeCells[it].symbol == "1") {
                move("1", 1, 1);
            }
            // B/B,R to state 12
            else if (tapeCells[it].symbol == "B") {
                move("B", 1, 12);
            }
        }

        // STATE 1
        else if (state == 1) {
            // 1/1,R to state 2
            if (tapeCells[it].symbol == "1") {
                move("1", 1, 2);
            }
            // B/B,L to state 11
            else if (tapeCells[it].symbol == "B") {
                move("B", -1, 11);
            }
        }

        // STATE 2
        else if (state == 2) {
            // 1/X,R to state 3
            if (tapeCells[it].symbol == "1") {
                move("X", 1, 3);
            }
            // B/B,L to state 11
            else if (tapeCells[it].symbol == "B") {
                move("B", -1, 11);
            }
        }

        // STATE 3
        else if (state == 3) {
            // 1/X,L to state 4
            if (tapeCells[it].symbol == "1") {
                move("X", -1, 4);
            }
            // X/X,R to state 3
            else if (tapeCells[it].symbol == "X") {
                move("X", 1, 3);
            }
            // B/B,L to state 7
            else if (tapeCells[it].symbol == "B") {
                move("B", -1, 7);
            }
        }

        // STATE 4
        else if (state == 4) {
            // 0/0,L to state 4
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 4);
            }
            // 1/1,L to state 4
            else if (tapeCells[it].symbol == "1") {
                move("1", -1, 4);
            }
            // X/X,L to state 4
            else if (tapeCells[it].symbol == "X") {
                move("X", -1, 4);
            }
            // B/B,R to state 5
            else if (tapeCells[it].symbol == "B") {
                move("B", 1, 5);
            }     
        }

        // STATE 5
        else if (state == 5) {
            // 0/1,R to state 6
            if (tapeCells[it].symbol == "0") {
                move("1", 1, 6);
            }
            // 1/0,R to state 5
            else if (tapeCells[it].symbol == "1") {
                move("0", 1, 5);
            }
            // X/1,R to state 6
            else if (tapeCells[it].symbol == "X") {
                move("1", 1, 6);
            }
        }

        // STATE 6
        else if (state == 6) {
            // 0/0,R to state 6
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 6);
            }
            // 1/1,R to state 6
            else if (tapeCells[it].symbol == "1") {
                move("1", 1, 6);
            }
            // X/X,R to state 3
            else if (tapeCells[it].symbol == "X") {
                move("X", 1, 3);
            }
        }

        // STATE 7
        else if (state == 7) {
            // 0/0,L to state 7
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 7);
            }
            // 1/1,L to state 7
            else if (tapeCells[it].symbol == "1") {
                move("1", -1, 7);
            }
            // X/B,L to state 7
            else if (tapeCells[it].symbol == "X") {
                move("B", -1, 7);
            }
            // B/B,R to state 8
            else if (tapeCells[it].symbol == "B") {
                move("B", 1, 8);
            }
        }

        // STATE 8
        else if (state == 8) {
            // 0/1,R to state 8
            if (tapeCells[it].symbol == "0") {
                move("1", 1, 8);
            }
            // 1/1,R to state 9
            else if (tapeCells[it].symbol == "1") {
                move("1", 1, 9);
            }
        }

        // STATE 9
        else if (state == 9) {
            // 0/1,R to state 9
            if (tapeCells[it].symbol == "0") {
                move("1", 1, 9);
            }
            // 1/1,R to state 10
            else if (tapeCells[it].symbol == "1") {
                move("1", 1, 10);
            }
            // B/B,L to state 11
            else if (tapeCells[it].symbol == "B") {
                move("B", -1, 11);
            }
        }

        // STATE 10
        else if (state == 10) {
            // 0/1,R to state 10
            if (tapeCells[it].symbol == "0") {
                move("1", 1, 10);
            }
            // 1/1,R to state 10
            else if (tapeCells[it].symbol == "1") {
                move("1", 1, 10);
            }
            // B/B,L to state 12
            else if (tapeCells[it].symbol == "B") {
                move("B", -1, 12);
            }
        }

        // STATE 11
        else if (state == 11) {
            // 1/B,R to state 12
            if (tapeCells[it].symbol == "1") {
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