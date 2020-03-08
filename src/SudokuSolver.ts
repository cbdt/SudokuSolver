const BOX_SIZE = 3;
const SIZE = BOX_SIZE * BOX_SIZE;

class Sudoku {
  static sudokuSolver: SudokuSolver;

  private static getBoardFromHtml(): Cell[][] {
    let cells: Cell[][] = [];
    const rootInput = document.querySelector("#sudokuInput");
    const inputs = rootInput.querySelectorAll("input[type=text]");
    inputs.forEach((input: HTMLInputElement) => {
      const x = input.getAttribute("data-x");
      if (cells[x] === undefined) cells[x] = [];
      const y = input.getAttribute("data-y");
      const value = input.value;
      let cell = new Cell(value === "" ? 0 : parseInt(value));
      cells[x][y] = cell;
    });
    return cells;
  }

  static resolve() {
    const cells = Sudoku.getBoardFromHtml();
    this.sudokuSolver = new SudokuSolver(cells);
    const [isResolved, resolvedCells] = this.sudokuSolver.process();
  }
}

class SudokuSolver {
  /** Cell[x][y] */
  board: Cell[][];

  constructor(board: Cell[][]) {
    this.board = board;
  }

  private ac3(): void {}
  private lcv(): void {}
  private mrv(): void {}

  private lineConstraints(row: number): Set<number> {
    let constraints = new Set<number>();
    for (let col = 0; col < SIZE; col++) {
      let cell = this.board[col][row];
      if (cell.value !== undefined) {
        constraints.add(cell.value);
      }
    }
    return constraints;
  }
  private columnConstraints(col: number): Set<number> {
    let constraints = new Set<number>();
    for (let row = 0; row < SIZE; row++) {
      let cell = this.board[col][row];
      if (cell.value !== undefined) {
        constraints.add(cell.value);
      }
    }
    return constraints;
  }
  private boxConstraints(col: number, row: number): Set<number> {
    let constraints = new Set<number>();
    let cornerX = col - (col % BOX_SIZE);
    let cornerY = row - (row % BOX_SIZE);

    for (let _col = cornerX; _col < cornerX + BOX_SIZE; _col++) {
      for (let _row = cornerY; _row < cornerY + BOX_SIZE; _row++) {
        let cell = this.board[col][row];
        if (cell.value !== undefined) {
          constraints.add(cell.value);
        }
      }
    }
    return constraints;
  }

  public process(): [boolean, Cell[][]] {
    const cells: Cell[][] = [];
    const isResolved = true;

    // Algorithme de resolution

    return [isResolved, cells];
  }
}

class Cell {
  ///position: [number, number];
  value: number | undefined; // if undefined, no value (yet)
  possibilies: Set<number>;

  constructor(value: number) {
    this.value = value;
  }

  removePossibleValue(value: number) {
    if (this.possibilies.has(value)) {
      this.possibilies.delete(value);
    }
  }
}
