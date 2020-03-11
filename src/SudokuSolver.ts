const BOX_SIZE = 3;
const SIZE = BOX_SIZE * BOX_SIZE;
const COLUMNS: string = "012345678";
const ROWS: string = "ABCDEFGHI";

class Sudoku {
  static sudokuSolver: SudokuSolver;

  private static getBoardFromHtml(): Map<string, number[]> {
    let cells: Map<string, number[]> = new Map();
    const rootInput = document.querySelector("#sudokuInput");
    const inputs = rootInput.querySelectorAll("input[type=text]");
    inputs.forEach((input: HTMLInputElement) => {
      const x = input.getAttribute("data-x");
      if (cells[x] === undefined) cells[x] = [];
      const y = input.getAttribute("data-y");
      const value = input.value;
      cells.set(y + "" + x, value === "" ? [0] : [parseInt(value)]);
    });
    return cells;
  }

  private static displayBoard(cells: Map<string, number[]>, id: string): void {
    const rootInput = document.querySelector(id);
    const inputs = rootInput.querySelectorAll("input[type=text]");
    inputs.forEach((input: HTMLInputElement) => {
      const x = input.getAttribute("data-x");
      const y = input.getAttribute("data-y");
      input.value =
        cells.get(y + "" + x)[0] !== 0 ? cells.get(y + "" + x).toString() : "";
    });
  }

  static resolve() {
    let $resultTitle = document.querySelector(".result-title");
    $resultTitle.classList.remove("not-resolved", "resolved");
    let $loadingBox = document.querySelector(".loader-box");
    let $sudokuTable = document.querySelector("#sudokuSolution");
    $sudokuTable.classList.add("loading");
    $loadingBox.classList.add("is-loading");
    let cells = Sudoku.getBoardFromHtml();

    this.sudokuSolver = new SudokuSolver(cells);
    const [isResolved, resolvedCells] = this.sudokuSolver.process();
    $sudokuTable.classList.remove("loading");
    $loadingBox.classList.remove("is-loading");
    if (!isResolved) {
      $resultTitle.innerHTML = "Non résolvable.";
      $resultTitle.classList.add("not-resolved");
      return;
    }
    $resultTitle.innerHTML = "Résolu. 😎";
    $resultTitle.classList.add("resolved");
    Sudoku.displayBoard(resolvedCells, "#sudokuSolution");
    // On affiche le sudoku sur la partie droite de l'écran.
  }

  static generateSudoku(level: number) {
    let grid: string;
    if (level === 0) {
      grid =
        '[["A0",[0]],["A1",[0]],["A2",[0]],["A3",[2]],["A4",[6]],["A5",[0]],["A6",[7]],["A7",[0]],["A8",[1]],["B0",[6]],["B1",[8]],["B2",[0]],["B3",[0]],["B4",[7]],["B5",[0]],["B6",[0]],["B7",[9]],["B8",[0]],["C0",[1]],["C1",[9]],["C2",[0]],["C3",[0]],["C4",[0]],["C5",[4]],["C6",[5]],["C7",[0]],["C8",[0]],["D0",[8]],["D1",[2]],["D2",[0]],["D3",[1]],["D4",[0]],["D5",[0]],["D6",[0]],["D7",[4]],["D8",[0]],["E0",[0]],["E1",[0]],["E2",[4]],["E3",[6]],["E4",[0]],["E5",[2]],["E6",[9]],["E7",[0]],["E8",[0]],["F0",[0]],["F1",[5]],["F2",[0]],["F3",[0]],["F4",[0]],["F5",[3]],["F6",[0]],["F7",[2]],["F8",[8]],["G0",[0]],["G1",[0]],["G2",[9]],["G3",[3]],["G4",[0]],["G5",[0]],["G6",[0]],["G7",[7]],["G8",[4]],["H0",[0]],["H1",[4]],["H2",[0]],["H3",[0]],["H4",[5]],["H5",[0]],["H6",[0]],["H7",[3]],["H8",[6]],["I0",[7]],["I1",[0]],["I2",[3]],["I3",[0]],["I4",[1]],["I5",[8]],["I6",[0]],["I7",[0]],["I8",[0]]]';
    } else if (level === 1) {
      grid =
        '[["A0",[5]],["A1",[0]],["A2",[1]],["A3",[0]],["A4",[0]],["A5",[0]],["A6",[6]],["A7",[0]],["A8",[4]],["B0",[0]],["B1",[9]],["B2",[0]],["B3",[3]],["B4",[0]],["B5",[6]],["B6",[0]],["B7",[5]],["B8",[0]],["C0",[0]],["C1",[0]],["C2",[0]],["C3",[0]],["C4",[9]],["C5",[0]],["C6",[0]],["C7",[0]],["C8",[0]],["D0",[4]],["D1",[0]],["D2",[0]],["D3",[0]],["D4",[0]],["D5",[0]],["D6",[0]],["D7",[0]],["D8",[9]],["E0",[0]],["E1",[0]],["E2",[0]],["E3",[1]],["E4",[0]],["E5",[9]],["E6",[0]],["E7",[0]],["E8",[0]],["F0",[7]],["F1",[0]],["F2",[0]],["F3",[0]],["F4",[0]],["F5",[0]],["F6",[0]],["F7",[0]],["F8",[6]],["G0",[0]],["G1",[0]],["G2",[0]],["G3",[0]],["G4",[2]],["G5",[0]],["G6",[0]],["G7",[0]],["G8",[0]],["H0",[0]],["H1",[8]],["H2",[0]],["H3",[5]],["H4",[0]],["H5",[7]],["H6",[0]],["H7",[6]],["H8",[0]],["I0",[1]],["I1",[0]],["I2",[3]],["I3",[0]],["I4",[0]],["I5",[0]],["I6",[7]],["I7",[0]],["I8",[2]]]';
    } else if (level === 2) {
      grid =
        '[["A0",[0]],["A1",[0]],["A2",[0]],["A3",[0]],["A4",[0]],["A5",[0]],["A6",[0]],["A7",[0]],["A8",[0]],["B0",[0]],["B1",[0]],["B2",[0]],["B3",[0]],["B4",[0]],["B5",[3]],["B6",[0]],["B7",[8]],["B8",[5]],["C0",[0]],["C1",[0]],["C2",[1]],["C3",[0]],["C4",[2]],["C5",[0]],["C6",[0]],["C7",[0]],["C8",[0]],["D0",[0]],["D1",[0]],["D2",[0]],["D3",[5]],["D4",[0]],["D5",[7]],["D6",[0]],["D7",[0]],["D8",[0]],["E0",[0]],["E1",[0]],["E2",[4]],["E3",[0]],["E4",[0]],["E5",[0]],["E6",[1]],["E7",[0]],["E8",[0]],["F0",[0]],["F1",[9]],["F2",[0]],["F3",[0]],["F4",[0]],["F5",[0]],["F6",[0]],["F7",[0]],["F8",[0]],["G0",[5]],["G1",[0]],["G2",[0]],["G3",[0]],["G4",[0]],["G5",[0]],["G6",[0]],["G7",[7]],["G8",[3]],["H0",[0]],["H1",[0]],["H2",[2]],["H3",[0]],["H4",[1]],["H5",[0]],["H6",[0]],["H7",[0]],["H8",[0]],["I0",[0]],["I1",[0]],["I2",[0]],["I3",[0]],["I4",[4]],["I5",[0]],["I6",[0]],["I7",[0]],["I8",[9]]]';
    }
    this.displayBoard(new Map(JSON.parse(grid)), "#sudokuInput");
  }
}

class SudokuSolver {
  board: Map<string, number[]>;
  variables: Array<string>;
  binary_constraints: Array<Array<string>>;
  neighbors: Map<string, Array<string>>;
  possibilities: Map<string, Array<number>>;

  constructor(board: Map<string, number[]>) {
    this.board = board;
    this.variables = cross(ROWS, COLUMNS);
    this.neighbors = new Map();
    this.possibilities = new Map();
    this.binary_constraints = new Array();

    // GENERATION DES POSSIBILITES

    for (const [variable, value] of this.board) {
      this.possibilities.set(
        variable,
        value[0] === 0 ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : value
      );
    }

    // GENERATION DES CONTRAINTES

    let row_constraints = new Array<Array<string>>();
    let box_constraints = new Array<Array<string>>();
    let column_constraints = new Array<Array<string>>();

    for (let i = 0; i < ROWS.length; i++) {
      column_constraints.push(cross(ROWS[i], COLUMNS));
      row_constraints.push(cross(ROWS, COLUMNS[i]));
    }

    for (const _bi of ["ABC", "DEF", "GHI"]) {
      for (const _bj of ["012", "345", "678"]) {
        box_constraints.push(cross(_bi, _bj));
      }
    }

    // Transformation en contraintes binaires

    // Les permutations viennent le loadash et sont importés dans le HTML.
    for (const c of column_constraints) {
      this.binary_constraints.push(...permutations(c, 2));
    }
    for (const c of row_constraints) {
      this.binary_constraints.push(...permutations(c, 2));
    }
    for (const c of box_constraints) {
      this.binary_constraints.push(...permutations(c, 2));
    }

    // GENERATION DES VOISINS

    for (const v of this.variables) {
      this.neighbors.set(v, new Array<string>());
      for (const c of this.binary_constraints) {
        if (v === c[0]) this.neighbors.get(v).push(c[1]);
      }
    }
  }

  // Insipired by http://aima.cs.berkeley.edu/python/csp.html.
  public ac3(): boolean {
    let queue = [...this.binary_constraints]; // on clone les contraintes binaires.

    while (queue.length !== 0) {
      const [a, b] = queue.pop();

      if (this.removeInconsistentValues(a, b)) {
        if (this.possibilities.get(a).length === 0) return false;

        for (const n of this.neighbors.get(a)) {
          if (n !== a) {
            queue.push([n, a]);
          }
        }
      }
    }
    return true;
  }

  /**
   * On vérifie s'il y a des valeurs possibles communes etre a et b, si oui on enlève la possibiltié dans a.
   * @param a
   * @param b
   * @returns si une valeur à été supprimée.
   */
  private removeInconsistentValues(a: string, b: string): boolean {
    let removed = false;
    for (const value of this.possibilities.get(a)) {
      let conflict = false;
      for (const poss of this.possibilities.get(b)) {
        if (poss !== value) {
          conflict = true;
          break;
        }
      }
      if (!conflict) {
        const index = this.possibilities.get(a).indexOf(value);
        this.possibilities.get(a).splice(index, 1);
        removed = true;
      }
    }
    return removed;
  }

  // MRV : On choisit la cellule (variable) avec le moins de possibilité.
  private selectUnassignedVariables(assignement: Map<string, number>): string {
    const unassigned = this.variables.filter(
      v => [...assignement.keys()].indexOf(v) === -1
    );
    let min = 10;
    let minV = undefined;
    for (const [variable, poss] of this.possibilities) {
      if (unassigned.indexOf(variable) === -1) continue;
      if (poss.length <= min) {
        min = poss.length;
        minV = variable;
      }
    }
    return minV;
  }

  /**
   * On calcul les conflits existants avec les cellules voisines.
   * Est utilisé dans LCV.
   * @param variable
   * @param value
   */
  private conflicts(variable: string, value: number): number {
    let nbConflicts = 0;
    for (let neighbor of this.neighbors.get(variable)) {
      // Si l'intersection des deux possibilités n'est pas vide
      if (
        this.possibilities.get(neighbor).length > 1 &&
        this.possibilities.get(neighbor).indexOf(value) !== -1
      ) {
        nbConflicts++;
      }
    }
    return nbConflicts;
  }

  // LCV : On choisit une valeur qui à le moins d'impact sur les variables voisines
  private orderDomainsValues(variable: string): number[] {
    let poss = this.possibilities.get(variable);
    return poss.sort((a: number, b: number): number => {
      return this.conflicts(variable, a) - this.conflicts(variable, b);
    });
  }

  /**
   * On s'assure que la variable n'est pas inconsistente avec les assignements
   * @param assignement
   * @param variable
   * @param value
   */
  private isConsistent(
    assignement: Map<string, number>,
    variable: string,
    value: number
  ): boolean {
    for (const [_variable, _value] of assignement) {
      // si deux variables ont la même valeur et qu'elles sont voisines alors inconsistent.
      if (
        _value === value &&
        this.neighbors.get(variable).indexOf(_variable) !== -1
      ) {
        return false;
      }
    }
    return true;
  }

  private assign(
    assignement: Map<string, number>,
    variable: string,
    value: number
  ) {
    assignement.set(variable, value);

    this.forwardCheck(assignement, variable, value);
  }

  /**
   * On enlève dans la liste des possibilités des cellules voisines la valeur qu'on vient d'attribuer à la variable
   * @param assignement
   * @param variable
   * @param value
   */
  private forwardCheck(
    assignement: Map<string, number>,
    variable: string,
    value: number
  ) {
    for (const neighbor of this.neighbors.get(variable)) {
      if ([...assignement.keys()].indexOf(neighbor) === -1) {
        const index = this.possibilities.get(neighbor).indexOf(value);
        if (index !== -1) {
          this.possibilities.get(neighbor).slice(index, 1);
        }
      }
    }
  }

  private remove(assignement: Map<string, number>, variable: string) {
    assignement.delete(variable);
  }

  /**
   * Pseudo code : https://www.cpp.edu/~ftang/courses/CS420/notes/CSP.pdf
   * @param assignement
   */
  private backtracking(assignement: Map<string, number>) {
    if (assignement.size === this.variables.length) {
      return assignement;
    }
    const variable = this.selectUnassignedVariables(assignement);

    for (const value of this.orderDomainsValues(variable)) {
      if (this.isConsistent(assignement, variable, value)) {
        this.assign(assignement, variable, value);

        const result = this.backtracking(assignement);

        if (result) {
          return result;
        }
        this.remove(assignement, variable);
      }
    }
    return false;
  }

  private clearPossibilities(possibilites: Map<string, number[]>) {
    for (const key of possibilites.keys()) {
      possibilites.set(key, [0]);
    }
  }

  public process(): [boolean, Map<string, number[]>] {
    if (this.ac3()) {
      // on vérifie si le sudoku est complet
      const isFinished =
        [...this.possibilities.values()].filter(v => v.length !== 1).length ===
        0;
      if (!isFinished) {
        let assignement = new Map<string, number>();
        for (const v of this.variables) {
          if (this.possibilities.get(v).length === 1) {
            assignement.set(v, this.possibilities.get(v)[0]);
          }
          assignement = this.backtracking(assignement);

          if (!assignement) {
            this.clearPossibilities(this.possibilities);
            return [false, this.possibilities];
          }

          for (const [variable, value] of assignement) {
            this.possibilities.set(variable, [value]);
          }
        }
      }
      return [true, this.possibilities];
    }
    this.clearPossibilities(this.possibilities);
    return [false, this.possibilities];
  }
}

// UTILITY FUNCTIONS

const cross = (A: string, B: string): Array<string> => {
  let res = new Array<string>();
  for (let _a of A) {
    for (let _b of B) {
      res.push(_a + "" + _b);
    }
  }
  return res;
};
