let num1 = document.getElementById("num1");     // Number 1
let num2 = document.getElementById("num2");     // Number 2

// tampilkan tape
function execute() {
    // jika kondisi terpenuhi
    if (num1.value && num2.value && num1.value > 0 && num2.value > 0) {
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
    // Pangkat
    let ans = Math.pow(num1.value, num2.value);
    
    // Menampilkan jawaban
    let ansField = document.getElementById("ans");
    ansField.textContent = ans;
}

// next move button
function executeNextMove() {
    // Pangkat
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
            // 0/B,L to state 2
            if (tapeCells[it].symbol == "0") {
                move("B", -1, 2);
            }
        }

        // STATE 2
        else if (state == 2) {
            // C/C,L to state 2
            if (tapeCells[it].symbol == "C") {
                move("C", -1, 2);
            }
            // 0/X,R to state 3
            else if (tapeCells[it].symbol == "0") {
                move("X", 1, 3);
            }
        }

        // STATE 3
        else if (state == 3) {
            // X/X,R to state 3
            if (tapeCells[it].symbol == "X") {
                move("X", 1, 3);
            }
            // C/C,R to state 4
            else if (tapeCells[it].symbol == "C") {
                move("C", 1, 4);
            }
        }

        // STATE 4
        else if (state == 4) {
            // 0/0,R to state 4
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 4);
            }
            // B/B,R to state 4
            else if (tapeCells[it].symbol == "B") {
                move("B", 1, 4);
            }
            // C/C,R to state 5
            else if (tapeCells[it].symbol == "C") {
                move("C", 1, 5);
            }   
        }

        // STATE 5
        else if (state == 5) {
            // 0/0,R to state 5
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 5);
            }
            // B/0,L to state 6
            else if (tapeCells[it].symbol == "B") {
                move("0", -1, 6, 1);
            }
        }

        // STATE 6
        else if (state == 6) {
            // 0/0,L to state 6
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 6);
            }
            // C/C,L to state 6
            else if (tapeCells[it].symbol == "C") {
                move("C", -1, 6);
            }
            // B/B,L to state 6
            else if (tapeCells[it].symbol == "B") {
                move("B", -1, 6);
            }
            // X/X,L to state 7
            else if (tapeCells[it].symbol == "X") {
                move("X", -1, 7);
            }
        }

        // STATE 7
        else if (state == 7) {
            // X/X,L to state 7
            if (tapeCells[it].symbol == "X") {
                move("X", -1, 7);
            }
            // 0/X,R to state 3
            else if (tapeCells[it].symbol == "0") {
                move("X", 1, 3);
            }
            // B/B,R to state 8
            else if (tapeCells[it].symbol == "B") {
                move("B", 1, 8);
            }
        }

        // STATE 8
        else if (state == 8) {
            // C/C,L to state 8
            if (tapeCells[it].symbol == "C") {
                move("C", -1, 8);
            }
            // X/0,R to state 8
            else if (tapeCells[it].symbol == "X") {
                move("0", 1, 8);
            }
            // 0/X,R to state 9
            else if (tapeCells[it].symbol == "0") {
                move("X", 1, 9);
            }
        }

        // STATE 9
        else if (state == 9) {
            // C/C,R to state 10
            if (tapeCells[it].symbol == "C") {
                move("C", 1, 10);
            }
        }

        // STATE 10
        else if (state == 10) {
            // B/B,R to state 10
            if (tapeCells[it].symbol == "B") {
                move("B", 1, 10);
            }
            // 0/B,L to state 18
            else if (tapeCells[it].symbol == "0") {
                move("B", -1, 18);
            }
            // C/C,L to state 23
            else if (tapeCells[it].symbol == "C") {
                move("C", -1, 23);
            }
        }

        // STATE 11
        else if (state == 11) {
            // X/X,L to state 11
            if (tapeCells[it].symbol == "X") {
                move("X", -1, 11);
            }
            // 0/X,R to state 12
            else if (tapeCells[it].symbol == "0") {
                move("X", 1, 12);
            }
            // B/B,R to state 19
            else if (tapeCells[it].symbol == "B") {
                move("B", 1, 19);
            }
        }

        // STATE 12
        else if (state == 12) {
            // X/X,R to state 12
            if (tapeCells[it].symbol == "X") {
                move("X", 1, 12);
            }
            // C/C,R to state 13
            else if (tapeCells[it].symbol == "C") {
                move("C", 1, 13);
            }
        }

        // STATE 13
        else if (state == 13) {
            // 0/0,R to state 13
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 13);
            }
            // B/B,R to state 13
            else if (tapeCells[it].symbol == "B") {
                move("B", 1, 13);
            }
            // C/C,R to state 14
            else if (tapeCells[it].symbol == "C") {
                move("C", 1, 14);
            }
        }

        // STATE 14
        else if (state == 14) {
            // 0/0,R to state 14
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 14);
            }
            // Y/Y,R to state 14
            else if (tapeCells[it].symbol == "Y") {
                move("Y", 1, 14);
            }
            // B/B,L to state 15
            else if (tapeCells[it].symbol == "B") {
                move("B", -1, 15);
            }
        }

        // STATE 15
        else if (state == 15) {
            // Y/Y,L to state 15
            if (tapeCells[it].symbol == "Y") {
                move("Y", -1, 15);
            }
            // 0/Y,R to state 16
            else if (tapeCells[it].symbol == "0") {
                move("Y", 1, 16);
            }
            // C/C,L to state 18
            else if (tapeCells[it].symbol == "C") {
                move("C", -1, 18);
            }
        }

        // STATE 16
        else if (state == 16) {
            // 0/0,R to state 16
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 16);
            }
            // Y/Y,R to state 16
            else if (tapeCells[it].symbol == "Y") {
                move("Y", 1, 16);
            }
            // B/0,L to state 17
            else if (tapeCells[it].symbol == "B") {
                move("0", -1, 17, 1);
            }
        }

        // STATE 17
        else if (state == 17) {
            // 0/0,L to state 17
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 17);
            }
            // Y/Y,L to state 15
            else if (tapeCells[it].symbol == "Y") {
                move("Y", -1, 15);
            }
        }

        // STATE 18
        else if (state == 18) {
            // 0/0,L to state 18
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 18);
            }
            // B/B,L to state 18
            else if (tapeCells[it].symbol == "B") {
                move("B", -1, 18);
            }
            // C/C,L to state 11
            else if (tapeCells[it].symbol == "C") {
                move("C", -1, 11);
            }
        }

        // STATE 19
        else if (state == 19) {
            // X/0,R to state 19
            if (tapeCells[it].symbol == "X") {
                move("0", 1, 19);
            }
            // C/C,R to state 20
            else if (tapeCells[it].symbol == "C") {
                move("C", 1, 20);
            }
        }

        // STATE 20
        else if (state == 20) {
            // 0/0,R to state 20
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 20);
            }
            // B/B,R to state 20
            else if (tapeCells[it].symbol == "B") {
                move("B", 1, 20);
            }
            // C/C,R to state 21
            else if (tapeCells[it].symbol == "C") {
                move("C", 1, 21);
            }
        }

        // STATE 21
        else if (state == 21) {
            // 0/0,L to state 21
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 21);
            }
            // Y/0,R to state 21
            else if (tapeCells[it].symbol == "Y") {
                move("0", 1, 21);
            }
            // C/C,L to state 22
            else if (tapeCells[it].symbol == "C") {
                move("C", -1, 22);
            }
        }

        // STATE 22
        else if (state == 22) {
            // 0/0,L to state 22
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 22);
            }
            // B/B,L to state 22
            else if (tapeCells[it].symbol == "B") {
                move("B", -1, 22);
            }
            // C/C,L to state 8
            else if (tapeCells[it].symbol == "C") {
                move("C", -1, 8);
            }
        }

        // STATE 23
        else if (state == 23) {
            // B/B,L to state 23
            if (tapeCells[it].symbol == "B") {
                move("B", -1, 23);
            }
            // C/B,L to state 24
            else if (tapeCells[it].symbol == "C") {
                move("B", -1, 24);
            }
        }

        // STATE 24
        else if (state == 24) {
            // 0/B,L to state 24
            if (tapeCells[it].symbol == "0") {
                move("B", -1, 24);
            }
            // X/B,L to state 24
            else if (tapeCells[it].symbol == "X") {
                move("B", -1, 24);
            }
            // B/B,R to state 24
            else if (tapeCells[it].symbol == "B") {
                move("B", 1, 24);
            }
            // C/B,R to state 25
            else if (tapeCells[it].symbol == "C") {
                move("B", 1, 25);
            }
        }

        // STATE 25 (FINAL STATE)
        else if (state == 25) {
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