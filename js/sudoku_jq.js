let check;
let blank;
let next;
let tdTest;
let rowTest;
let tempValue;
let sudokuPointer = 0;
let saved = [];
let savedSudoku = [];
let sudokuValue = [];
let sudoku = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// Global Variable Assign end here
var correctanswer = 0;

function sudokuLoad() { 
    $(document).ready(function () { 
        solve(sudoku);
        $('.box').append(generateSudoku());
        generateButton();
        hideRandomToSolve();
        saveAnswerinConsole();
        $('.btn_num').click(function() { 
            $(`.${ rowTest } > .${ tdTest }`)
                .text('')
                .append($(this).text())
                .css({ 
                    'color': '#008000',
                    'background-color': '#fff',
                    'font-size': '25px',
                }
            );
        });
    });
}
// sudoku load end here 

function saveAnswerinConsole() {
    for(let count = 0 ; count < 81; count = count + 1) {
        if(count == 0){
            correctanswer += "Cheat Answer is here \n\n";
        }
        correctanswer += sudoku[count];
        correctanswer += " | ";
        if(count != 0 & (count+1)%9 == 0){
            correctanswer += "\n--+---+---+---+---+---+---+---+---|\n";
        }
    }
}
// Type "correctanswer in console to see the correct answer"

function solve(sudoku) { 
    while (!chkCorrect(sudoku)) {
        next = chkUniq(sudoku);
        if (next === false) { 
            next = saved.pop();
            sudoku = savedSudoku.pop();
        }
        tempValue = nextRandom(next);
        check = rendomPossibleValue(next, tempValue);
        if (next[tempValue].length > 1) { 
            next[tempValue] = removeChek(next[tempValue], check);
            saved.push(next.slice());
            savedSudoku.push(sudoku.slice());
        }
        sudoku[tempValue] = check;
    }
    sudokuValue = sudoku;
}
// Sudoku Solver which check condition at the end of game: End here 	

function chkCorrect(sudoku) {
    let i = 0;
    for (i; i <= 8; i += 1) {
        if (!isCorrectBlok(i, sudoku) || !isCorrectRow(i, sudoku) || !isCorrectCol(i, sudoku)) {
            return false;
        }
    }
    return true;
}
// Sudoku Condition Checking End here 

function isCorrectRow(row, sudoku) {
    let rightSequence = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let rowTemp = [];
    let i = 0;
    let exp;
    for (i; i <= 8; i += 1) {
        rowTemp[i] = sudoku[row * 9 + i];
    }
    rowTemp.sort();
    exp = `rowTemp.join() === rightSequence.join()`;
    return exp;
}
// Check Correct Row Checking End here 

function isCorrectCol(col, sudoku) {
    let rightSequence = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let colTemp = [];
    let i = 0;
    let data;
    for (i; i <= 8; i += 1) {
        colTemp[i] = sudoku[col + i * 9];
    }
    colTemp.sort();
    data = `colTemp.join() === rightSequence.join()`;
    return data;
}
// Check Correct Column Checking End here

function isCorrectBlok(block, sudoku) {
    let rightSequence = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let blockTemp = [];
    let i = 0;
    let data;
    for (i; i <= 8; i += 1) {
        blockTemp[i] = sudoku[Math.floor(block / 3) * 27 + i % 3 + 9 * Math.floor(i / 3) + 3 * (block % 3)];
    }
    blockTemp.sort();
    data = blockTemp.join() === rightSequence.join(); // checking True or false.
    return data;
}
// Check Correct Block function end here

function chkUniq(sudoku) {
    let possible = [];
    let i = 0;
    for (i; i <= 80; i += 1) {
        if (sudoku[i] === 0) {
            possible[i] = [];
            possible[i] = posibleVal(i, sudoku);
            if (possible[i].length === 0) {
                return false;
            }
        }
    }
    return possible;
}
// Check unique value in Array 

function nextRandom(possible) {
    let max = 9;
    let minChoices = 0;
    let i = 0;
    for (i; i <= 80; i += 1) {
        if (possible[i] !== undefined) {
            if ((possible[i].length <= max) && (possible[i].length > 0)) {
                max = possible[i].length;
                minChoices = i;
            }
        }
    }
    return minChoices;
}
// nextRandom Function End here 

function posibleVal(cell, sudoku) {
    let possible = [];
    let i = 1;
    for (i; i <= 9; i += 1) {
        if (chkPossibeNum(cell, i, sudoku)) {
            possible.unshift(i);
        }
    }
    return possible;
}

function chkPossibeNum(cell, number, sudoku) {
    let row = returnRow(cell);
    let col = returnCol(cell);
    let block = returnBlock(cell);
    let data = chkPossibleRow(number, row, sudoku) && chkPossibleCol(number, col, sudoku) && chkPosbileBlok(number, block, sudoku);
    return data;
}

function chkPossibleRow(number, row, sudoku) {
    let i = 0;
    for (i; i <= 8; i += 1) {
        let value = sudoku[row * 9 + i];
        if (value === number) {
            return false;
        }
    }
    return true;
}

function chkPossibleCol(number, col, sudoku) {
    let i = 0;
    for (i; i <= 8; i += 1) {
        let value = sudoku[col + 9 * i];
        if (value === number) {
            return false;
        }
    }
    return true;
}

function chkPosbileBlok(number, block, sudoku) {
    let i = 0;
    for (i; i <= 8; i += 1) {
        let check = sudoku[Math.floor(block / 3) * 27 + i % 3 + 9 * Math.floor(i / 3) + 3 * (block % 3)];
        if (check === number) {
            return false;
        }
    }
    return true;
}

function returnRow(cell) {
    let row = Math.floor(cell / 9);
    return row;
}

function returnCol(cell) {
    let data = cell % 9;
    return data;
}

function returnBlock(cell) {
    let data = Math.floor(returnRow(cell) / 3) * 3 + Math.floor(returnCol(cell) / 3);
    return data;
}

function rendomPossibleValue(possible, cell) {
    let rendomPick = Math.floor(Math.random() * possible[cell].length);
    return possible[cell][rendomPick];
}

function removeChek(checkArray, number) {
    let correct = [];
    let i = 0;
    for (i; i < checkArray.length; i += 1) {
        if (checkArray[i] != number) {
            correct.unshift(checkArray[i]);
        }
    }
    return correct;
}

function hideRandomToSolve() {
    for (blank = 0; blank < 60; blank += 1) {
        $(`.tabl_row_${ randomOne() } > .tabl_data_${ randomOne() }`)
            .css({
                'background-color' : '#fff',
                'cursor' : 'pointer',
            })
            .text('')
            .click(function() { 
                $(`.${ rowTest } > .${ tdTest } > img`).remove(); // Remove the previous pointer location.
                $(this).html(`<img src = images/question_mark.png />`)
                    .css({
                        'background-color' : '#fff',
                    });
                tdTest = $(this).attr('class');
                rowTest = $(this).parent().attr('class');
            }
        );
    };
}
// Every time some random box will be blank display function end here 

function generateButton() {
    return $('.num_button')
        .append(createButton(9, function() {
            return $('<button type = button>')
                .addClass('btn_num');
        }));
}

function createButton(count, tdBox) {
    let arr = [];
    let i = 0;
    for (i; i < count; i += 1) {
        arr.push(tdBox(i).text(i + 1).addClass(`bt${ i }`));
    }
    return arr;
}
// 1 to 9 button generate function end here

function generateSudoku() {
    return $('<table>')
        .append(createTr(9, function() {
            return $('<tr>')
                .append(createTd(9, function() {
                    return $('<td>')
                }));
        }))
        .addClass('sudoku');
}
// End of Table creation 

function createTr(count, tdBox) {
    let arr = [];
    let i = 0;
    for (i; i < count; i += 1) {
        arr.push(tdBox(i).addClass(`tabl_row_${ i }`));
    }
    return arr;
}
// End of tabel row 

function createTd(count, tdBox) {
    let arr = [];
    let i = 0;
    for (i; i < count; i += 1) {
        arr.push(tdBox(i)
            .addClass(`tabl_data_${ i }`)
            .text(tdValue(i))
            .css({
                'background-color' : '#eee',
            }));
    }
    return arr;
}
// End of all table data 

function tdValue() {
    let data = sudokuValue[sudokuPointer];
    sudokuPointer += 1;
    return data;
}		
// End of sudoku table value 

function restart() { 
    location.reload();
}
// End of function reload button 

function randomOne() {
    let data = Math.floor(Math.random() * 9);
    return data;
}
// End of random value initlisation 

function submitSudoku() {
    let index = 0;
    let incorrect = 0;
    let row = 0;
    for (row; row < 9; row += 1) {
        let column = 0;
        for (column; column < 9; column += 1, index += 1) {
            let value = $(`.tabl_row_${ row } > .tabl_data_${ column }`).text();
            if (sudokuValue[index] != value) {
                incorrect += 1;
                $(`.tabl_row_${ row } > .tabl_data_${ column } > img`).remove();
                $(`.tabl_row_${ row } > .tabl_data_${ column }`).css({
                    'background-color' : '#F00',
                    'color' : '#fff',
                });
            }
        }
    }
    if (incorrect > 0) {
        alert(`Opps! ${ incorrect } still Incorrect`);
    } else {
        alert(`You Won!!`);
    }
}
// End of Submit button and sudoku checking button