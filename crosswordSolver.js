// Function that solves the crossword puzzle.
function solveCrosswordPuzzle(puzzleInput, wordList) {
    if (!isValidPuzzleInput(puzzleInput) || !isValidWordList(wordList)) {
        return 'Error';
    }

    const grid = parsePuzzleInput(puzzleInput);
    const puzzle = initializePuzzleGrid(grid);

    if (!isWordCountValid(puzzleInput, wordList.length)) {
        return 'Error';
    }

    if (!placeWordsInPuzzle(wordList, grid, puzzle)) {
        return 'Error';
    }

    return puzzle.map(row => row.join("")).join("\n");
}

// Helper function to validate crossword puzzle input format
function isValidPuzzleInput(puzzleInput) {
    return typeof puzzleInput === "string" && /^[.\n012]+$/.test(puzzleInput);
}

// Helper function to validate list of words
function isValidWordList(wordList) {
    return Array.isArray(wordList) && wordList.length >= 3 && !hasDuplicates(wordList) &&
        wordList.every(word => typeof word === "string");
}

// Helper function to check if the number of words matches the number of starting positions in the puzzle
function isWordCountValid(puzzleInput, expectedCount) {
    const startWordCount = [...puzzleInput].reduce((count, char) => {
        return (char > '0' && char !== '.') ? count + parseInt(char) : count;
    }, 0);
    return startWordCount === expectedCount;
}

// Function to parse the input puzzle into a 2D array
function parsePuzzleInput(puzzleInput) {
    return puzzleInput.trim().split("\n").map(row => 
        [...row].map(char => (char === "." ? -1 : parseInt(char)))
    );
}

// Function to initialize the puzzle grid
function initializePuzzleGrid(grid) {
    return grid.map(row => row.map(char => (char === -1 ? "." : "")));
}

// Function to place words into the puzzle grid
function placeWordsInPuzzle(wordList, grid, puzzle) {
    const placeWords = (currentIndex) => {
        if (currentIndex === wordList.length) return true;

        const word = wordList[currentIndex];

        for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
            for (let colIndex = 0; colIndex < grid[0].length; colIndex++) {
                if (grid[rowIndex][colIndex] === 0) continue;

                const position = { row: rowIndex, col: colIndex };

                if (tryPlacingWord(word, position, puzzle, placeWords, currentIndex)) {
                    return true;
                }
            }
        }
        return false;
    };

    return placeWords(0);
}

// Function to attempt placing a word in a specific direction
function tryPlacingWord(word, position, puzzle, placeWords, currentIndex) {
    const directions = ["horizontal", "vertical"];
    for (const direction of directions) {
        const backup = [];

        if (canPlaceWord(word, position, puzzle, backup, direction)) {
            if (placeWords(currentIndex + 1)) {
                return true;
            }
            restorePreviousState(backup, puzzle);
        }
    }
    return false;
}

// Function to check if a word can be placed at a position
function canPlaceWord(word, { row, col }, puzzle, backup, direction) {
    for (let i = 0; i < word.length; i++) {
        const r = direction === "horizontal" ? row : row + i;
        const c = direction === "horizontal" ? col + i : col;

        if (r >= puzzle.length || c >= puzzle[0].length ||
            (puzzle[r][c] !== "" && puzzle[r][c] !== word[i])) {
            return false;
        }

        backup.push({ row: r, col: c, value: puzzle[r][c] });
        puzzle[r][c] = word[i];
    }
    return true;
}

// Function to restore the previous state of the puzzle
function restorePreviousState(backup, puzzle) {
    backup.forEach(({ row, col, value }) => {
        puzzle[row][col] = value;
    });
}

// Function to check for duplicates in an array
function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

const emptyPuzzle = `2001
0..0
1000
0..0`
const words = ['casa', 'alan', 'ciao', 'anta']
console.log(solveCrosswordPuzzle(emptyPuzzle, words))
