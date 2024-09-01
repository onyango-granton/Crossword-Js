const emptyPuzzle = `2001
0..0
1000
0..0`;

const words = ["casa", "alan", "ciao", "anta"];


const puzzleTo2DArray = function (arg) {
    let resArr = new Array
    let rowArr = new Array
    for (let i = 0; i < arg.length; i++){
        if (arg[i] == '\n') {
            resArr.push(rowArr)
            rowArr = []
            continue
        }
        rowArr.push(arg[i])
        if (i == arg.length - 1) {
            resArr.push(rowArr)
        }
    }

    return resArr

}

const puzzle2DArrayToNum2D = function (arg) {
    const num2DArr = puzzleTo2DArray(arg)
    for (let row = 0; row < num2DArr.length; row++){
        for (let col = 0; col < num2DArr[row].length; col++){
            if (Number.isNaN(Number(num2DArr[row][col]))) {
                
            } else {
                let num = Number(num2DArr[row][col]);
                num2DArr[row][col] = num
            }
            // console.log(num2DArr[row][col]);
        }
    }
    return num2DArr
}

const canPlaceV = function (board, boardRow, boardCol, word) {
    // for (let row = 0; row < board.length; row++){
    //     for (let col = 0; col < board[row].length; col++){
    // if (
    //   word.length <= board[boardRow].length - boardCol &&
    //   (board[boardRow][boardCol] !== 0 && board[boardRow][boardCol] !== ".")
    // ) {
    //   console.log("horizontal", board[boardRow][boardCol]);
    //   return true;
    // }
    if (
      word.length <= board.length - boardRow &&
      acceptedRegex.test(board[boardRow][boardCol])
    ) {
      console.log("vertical", board[boardRow][boardCol]);
      return true;
    }
        }
//     }
// }

const acceptedRegex = /[1-9]/


const canPlaceH = function (board, boardRow, boardCol, word) {
    if (
      word.length <= board[boardRow].length - boardCol &&
      acceptedRegex.test(board[boardRow][boardCol])
    ) {
      console.log("horizontal", board[boardRow][boardCol]);
      return true;
    }
}


const place = function (board, word) {
    for (let row = 0; row < board.length; row++){
        for (let col = 0; col < board[row].length; col++){
            if (canPlaceV(board, row, col, word)) {
                placeV(board, row, col, word)
            }
            if (canPlaceH(board, row, col, word)) {
              placeH(board, row, col, word);
            }
        }
    }
    return board
}

const placeV = function (board, row,col, word) {
    // for (let row = 0; row < board.length; row++) {
    //   for (let col = 0; col < board[row].length; col++) {
          for (let wordIndex = 0; wordIndex < word.length; wordIndex++){
              board[row][col] = word[wordIndex]
              row++
            //   col++
          }
          return
      }
//     }
// }


const placeH = function (board, row,col, word) {
    // for (let row = 0; row < board.length; row++) {
    //   for (let col = 0; col < board[row].length; col++) {
          for (let wordIndex = 0; wordIndex < word.length; wordIndex++){
              board[row][col] = word[wordIndex]
            //   row++
              col++
          }
          return
      }
//     }
// }


const wordArrayto2DArray = function (arg) {
    let resArr = new Array
    let rowArr = new Array
    for (let i = 0; i < arg.length; i++){
        for (let j = 0; j < arg[i].length; j++){
            rowArr.push(arg[i][j])
        }
        resArr.push(rowArr)
        rowArr = []
    }
    return resArr
}

console.log(puzzleTo2DArray(emptyPuzzle))
console.log(wordArrayto2DArray(words))

console.log(puzzle2DArrayToNum2D(emptyPuzzle))

let board = puzzle2DArrayToNum2D(emptyPuzzle);


console.log(place(board,"casa"))