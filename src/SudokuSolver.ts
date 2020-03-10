const BOX_SIZE = 3;
const SIZE = BOX_SIZE * BOX_SIZE;
const COLUMNS: string = "123456789";
const ROWS: string = "ABCDEFGHI";

class Sudoku {
  static sudokuSolver: SudokuSolver;

  private static getBoardFromHtml(): Map<string, number> {
    let cells: Map<string, number> = new Map();
    const rootInput = document.querySelector("#sudokuInput");
    const inputs = rootInput.querySelectorAll("input[type=text]");
    inputs.forEach((input: HTMLInputElement) => {
      const x = input.getAttribute("data-x");
      if (cells[x] === undefined) cells[x] = [];
      const y = input.getAttribute("data-y");
      const value = input.value;
      cells.set(y + "" + x, value === "" ? 0 : parseInt(value));
    });
    return cells;
  }

  private static displayBoard(cells: Map<string, number>): void {
    const rootInput = document.querySelector("#sudokuSolution");
    const inputs = rootInput.querySelectorAll("input[type=text]");
    inputs.forEach((input: HTMLInputElement) => {
      const x = input.getAttribute("data-x");
      const y = input.getAttribute("data-y");
      input.value =
        cells.get(y + "" + x) !== 0 ? cells.get(y + "" + x).toString() : "";
      input.disabled = true;
    });
  }

  static resolve() {
    let cells = Sudoku.getBoardFromHtml();
    let $resultTitle = document.querySelector(".result-title");
    this.sudokuSolver = new SudokuSolver(cells);
    const [isResolved, resolvedCells] = this.sudokuSolver.process();
    if (!isResolved) {
      $resultTitle.innerHTML = "Non résolu";
      $resultTitle.classList.add("not resolved");
      return;
    }
    $resultTitle.innerHTML = "Résolu";
    $resultTitle.classList.add("resolved");
    Sudoku.displayBoard(resolvedCells);
    // On affiche le sudoku sur la partie droite de l'écran.
  }
}

class SudokuSolver {
  /** Cell[x][y] */
  board: Map<string, number>;
  variables: Array<string>;
  constraints: Array<Array<string>>;
  binary_constraints: Array<Array<string>>;
  neighbors: Map<string, Array<string>>;
  possibilities: Map<string, Array<number>>;

  constructor(board: Map<string, number>) {
    this.board = board;
    this.variables = this.cross(COLUMNS, ROWS);
    this.neighbors = new Map();
    this.possibilities = new Map();
    this.constraints = new Array();
    this.binary_constraints = new Array();

    // GENERATION DES POSSIBILITES

    for (const [position, value] of this.board) {
      this.possibilities.set(
        position,
        value === 0 ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : [value]
      );
    }

    // GENERATION DES CONTRAINTES

    for (let i = 0; i < ROWS.length; i++) {
      this.constraints.push(this.cross(ROWS[i], COLUMNS));
      this.constraints.push(this.cross(ROWS, COLUMNS[i]));
    }

    for (const _bi of ["ABC", "DEF", "GHI"]) {
      for (const _bj of ["123", "456", "789"]) {
        this.constraints.push(this.cross(_bi, _bj));
      }
    }

    // Transformation en contraintes binaires

    for (const c of this.constraints) {
      this.binary_constraints.push(...k_combinations<string>(c, 2));
    }

    this.binary_constraints = [...new Set(this.binary_constraints)]; // Enlève les doublons.

    // GENERATION DES VOISINS

    for (const v of this.variables) {
      this.neighbors.set(v, new Array<string>());
      for (const c of this.binary_constraints) {
        if (v === c[0]) this.neighbors[v].push(c[1]);
      }
    }
  }

  public process(): [boolean, Map<string, number>] {
    // TODO: To remove
    const cells: Map<string, number> = this.board; // for now we display the same cells to see if it works.
    const isResolved = true;

    return [isResolved, cells];
  }

  private cross(A: string, B: string): Array<string> {
    let res = new Array<string>();
    for (let _a of A) {
      for (let _b of B) {
        res.push(_a + "" + _b);
      }
    }
    return res;
  }
}

// UTILS

// https://gist.github.com/axelpale/3118596
const k_combinations = <T>(set: T[], k: number): T[][] => {
  if (k > set.length || k <= 0) {
    return [];
  }

  if (k === set.length) {
    return [set];
  }

  if (k === 1) {
    return set.reduce((acc, cur) => [...acc, [cur]], [] as T[][]);
  }

  const combs = [] as T[][];
  let tail_combs = [];

  for (let i = 0; i <= set.length - k + 1; i++) {
    tail_combs = k_combinations(set.slice(i + 1), k - 1);
    for (let j = 0; j < tail_combs.length; j++) {
      combs.push([set[i], ...tail_combs[j]]);
    }
  }

  return combs;
};
