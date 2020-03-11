"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BOX_SIZE = 3;
var SIZE = BOX_SIZE * BOX_SIZE;
var COLUMNS = "012345678";
var ROWS = "ABCDEFGHI";

var Sudoku = /*#__PURE__*/function () {
  function Sudoku() {
    _classCallCheck(this, Sudoku);
  }

  _createClass(Sudoku, null, [{
    key: "getBoardFromHtml",
    value: function getBoardFromHtml() {
      var cells = new Map();
      var rootInput = document.querySelector("#sudokuInput");
      var inputs = rootInput.querySelectorAll("input[type=text]");
      inputs.forEach(function (input) {
        var x = input.getAttribute("data-x");
        if (cells[x] === undefined) cells[x] = [];
        var y = input.getAttribute("data-y");
        var value = input.value;
        cells.set(y + "" + x, value === "" ? [0] : [parseInt(value)]);
      });
      return cells;
    }
  }, {
    key: "displayBoard",
    value: function displayBoard(cells, id) {
      var rootInput = document.querySelector(id);
      var inputs = rootInput.querySelectorAll("input[type=text]");
      inputs.forEach(function (input) {
        var x = input.getAttribute("data-x");
        var y = input.getAttribute("data-y");
        input.value = cells.get(y + "" + x)[0] !== 0 ? cells.get(y + "" + x).toString() : "";
      });
    }
  }, {
    key: "resolve",
    value: function resolve() {
      var $resultTitle = document.querySelector(".result-title");
      $resultTitle.classList.remove("not-resolved", "resolved");
      var $loadingBox = document.querySelector(".loader-box");
      var $sudokuTable = document.querySelector("#sudokuSolution");
      $sudokuTable.classList.add("loading");
      $loadingBox.classList.add("is-loading");
      var cells = Sudoku.getBoardFromHtml();
      this.sudokuSolver = new SudokuSolver(cells);

      var _this$sudokuSolver$pr = this.sudokuSolver.process(),
          _this$sudokuSolver$pr2 = _slicedToArray(_this$sudokuSolver$pr, 2),
          isResolved = _this$sudokuSolver$pr2[0],
          resolvedCells = _this$sudokuSolver$pr2[1];

      $sudokuTable.classList.remove("loading");
      $loadingBox.classList.remove("is-loading");

      if (!isResolved) {
        $resultTitle.innerHTML = "Non résolvable.";
        $resultTitle.classList.add("not-resolved");
        return;
      }

      $resultTitle.innerHTML = "Résolu. 😎";
      $resultTitle.classList.add("resolved");
      Sudoku.displayBoard(resolvedCells, "#sudokuSolution"); // On affiche le sudoku sur la partie droite de l'écran.
    }
  }, {
    key: "generateSudoku",
    value: function generateSudoku(level) {
      var grid;

      if (level === 0) {
        grid = '[["A0",[0]],["A1",[0]],["A2",[0]],["A3",[2]],["A4",[6]],["A5",[0]],["A6",[7]],["A7",[0]],["A8",[1]],["B0",[6]],["B1",[8]],["B2",[0]],["B3",[0]],["B4",[7]],["B5",[0]],["B6",[0]],["B7",[9]],["B8",[0]],["C0",[1]],["C1",[9]],["C2",[0]],["C3",[0]],["C4",[0]],["C5",[4]],["C6",[5]],["C7",[0]],["C8",[0]],["D0",[8]],["D1",[2]],["D2",[0]],["D3",[1]],["D4",[0]],["D5",[0]],["D6",[0]],["D7",[4]],["D8",[0]],["E0",[0]],["E1",[0]],["E2",[4]],["E3",[6]],["E4",[0]],["E5",[2]],["E6",[9]],["E7",[0]],["E8",[0]],["F0",[0]],["F1",[5]],["F2",[0]],["F3",[0]],["F4",[0]],["F5",[3]],["F6",[0]],["F7",[2]],["F8",[8]],["G0",[0]],["G1",[0]],["G2",[9]],["G3",[3]],["G4",[0]],["G5",[0]],["G6",[0]],["G7",[7]],["G8",[4]],["H0",[0]],["H1",[4]],["H2",[0]],["H3",[0]],["H4",[5]],["H5",[0]],["H6",[0]],["H7",[3]],["H8",[6]],["I0",[7]],["I1",[0]],["I2",[3]],["I3",[0]],["I4",[1]],["I5",[8]],["I6",[0]],["I7",[0]],["I8",[0]]]';
      } else if (level === 1) {
        grid = '[["A0",[5]],["A1",[0]],["A2",[1]],["A3",[0]],["A4",[0]],["A5",[0]],["A6",[6]],["A7",[0]],["A8",[4]],["B0",[0]],["B1",[9]],["B2",[0]],["B3",[3]],["B4",[0]],["B5",[6]],["B6",[0]],["B7",[5]],["B8",[0]],["C0",[0]],["C1",[0]],["C2",[0]],["C3",[0]],["C4",[9]],["C5",[0]],["C6",[0]],["C7",[0]],["C8",[0]],["D0",[4]],["D1",[0]],["D2",[0]],["D3",[0]],["D4",[0]],["D5",[0]],["D6",[0]],["D7",[0]],["D8",[9]],["E0",[0]],["E1",[0]],["E2",[0]],["E3",[1]],["E4",[0]],["E5",[9]],["E6",[0]],["E7",[0]],["E8",[0]],["F0",[7]],["F1",[0]],["F2",[0]],["F3",[0]],["F4",[0]],["F5",[0]],["F6",[0]],["F7",[0]],["F8",[6]],["G0",[0]],["G1",[0]],["G2",[0]],["G3",[0]],["G4",[2]],["G5",[0]],["G6",[0]],["G7",[0]],["G8",[0]],["H0",[0]],["H1",[8]],["H2",[0]],["H3",[5]],["H4",[0]],["H5",[7]],["H6",[0]],["H7",[6]],["H8",[0]],["I0",[1]],["I1",[0]],["I2",[3]],["I3",[0]],["I4",[0]],["I5",[0]],["I6",[7]],["I7",[0]],["I8",[2]]]';
      } else if (level === 2) {
        grid = '[["A0",[0]],["A1",[0]],["A2",[0]],["A3",[0]],["A4",[0]],["A5",[0]],["A6",[0]],["A7",[0]],["A8",[0]],["B0",[0]],["B1",[0]],["B2",[0]],["B3",[0]],["B4",[0]],["B5",[3]],["B6",[0]],["B7",[8]],["B8",[5]],["C0",[0]],["C1",[0]],["C2",[1]],["C3",[0]],["C4",[2]],["C5",[0]],["C6",[0]],["C7",[0]],["C8",[0]],["D0",[0]],["D1",[0]],["D2",[0]],["D3",[5]],["D4",[0]],["D5",[7]],["D6",[0]],["D7",[0]],["D8",[0]],["E0",[0]],["E1",[0]],["E2",[4]],["E3",[0]],["E4",[0]],["E5",[0]],["E6",[1]],["E7",[0]],["E8",[0]],["F0",[0]],["F1",[9]],["F2",[0]],["F3",[0]],["F4",[0]],["F5",[0]],["F6",[0]],["F7",[0]],["F8",[0]],["G0",[5]],["G1",[0]],["G2",[0]],["G3",[0]],["G4",[0]],["G5",[0]],["G6",[0]],["G7",[7]],["G8",[3]],["H0",[0]],["H1",[0]],["H2",[2]],["H3",[0]],["H4",[1]],["H5",[0]],["H6",[0]],["H7",[0]],["H8",[0]],["I0",[0]],["I1",[0]],["I2",[0]],["I3",[0]],["I4",[4]],["I5",[0]],["I6",[0]],["I7",[0]],["I8",[9]]]';
      }

      this.displayBoard(new Map(JSON.parse(grid)), "#sudokuInput");
    }
  }]);

  return Sudoku;
}();

var SudokuSolver = /*#__PURE__*/function () {
  function SudokuSolver(board) {
    _classCallCheck(this, SudokuSolver);

    this.board = board;
    this.variables = cross(ROWS, COLUMNS);
    this.neighbors = new Map();
    this.possibilities = new Map();
    this.binary_constraints = new Array(); // GENERATION DES POSSIBILITES

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.board[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _slicedToArray(_step.value, 2),
            variable = _step$value[0],
            value = _step$value[1];

        this.possibilities.set(variable, value[0] === 0 ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : value);
      } // GENERATION DES CONTRAINTES

    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var row_constraints = new Array();
    var box_constraints = new Array();
    var column_constraints = new Array();

    for (var i = 0; i < ROWS.length; i++) {
      column_constraints.push(cross(ROWS[i], COLUMNS));
      row_constraints.push(cross(ROWS, COLUMNS[i]));
    }

    for (var _i2 = 0, _arr2 = ["ABC", "DEF", "GHI"]; _i2 < _arr2.length; _i2++) {
      var _bi = _arr2[_i2];

      for (var _i6 = 0, _arr3 = ["012", "345", "678"]; _i6 < _arr3.length; _i6++) {
        var _bj = _arr3[_i6];
        box_constraints.push(cross(_bi, _bj));
      }
    } // Transformation en contraintes binaires
    // Les permutations viennent le loadash et sont importés dans le HTML.


    for (var _i3 = 0, _column_constraints = column_constraints; _i3 < _column_constraints.length; _i3++) {
      var _this$binary_constrai;

      var c = _column_constraints[_i3];

      (_this$binary_constrai = this.binary_constraints).push.apply(_this$binary_constrai, _toConsumableArray(permutations(c, 2)));
    }

    for (var _i4 = 0, _row_constraints = row_constraints; _i4 < _row_constraints.length; _i4++) {
      var _this$binary_constrai2;

      var _c = _row_constraints[_i4];

      (_this$binary_constrai2 = this.binary_constraints).push.apply(_this$binary_constrai2, _toConsumableArray(permutations(_c, 2)));
    }

    for (var _i5 = 0, _box_constraints = box_constraints; _i5 < _box_constraints.length; _i5++) {
      var _this$binary_constrai3;

      var _c2 = _box_constraints[_i5];

      (_this$binary_constrai3 = this.binary_constraints).push.apply(_this$binary_constrai3, _toConsumableArray(permutations(_c2, 2)));
    } // GENERATION DES VOISINS


    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = this.variables[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var v = _step2.value;
        this.neighbors.set(v, new Array());
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.binary_constraints[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _c3 = _step3.value;
            if (v === _c3[0]) this.neighbors.get(v).push(_c3[1]);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  } // Insipired by http://aima.cs.berkeley.edu/python/csp.html.


  _createClass(SudokuSolver, [{
    key: "ac3",
    value: function ac3() {
      var queue = _toConsumableArray(this.binary_constraints); // on clone les contraintes binaires.


      while (queue.length !== 0) {
        var _queue$pop = queue.pop(),
            _queue$pop2 = _slicedToArray(_queue$pop, 2),
            a = _queue$pop2[0],
            b = _queue$pop2[1];

        if (this.removeInconsistentValues(a, b)) {
          if (this.possibilities.get(a).length === 0) return false;
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = this.neighbors.get(a)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var n = _step4.value;

              if (n !== a) {
                queue.push([n, a]);
              }
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                _iterator4["return"]();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
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

  }, {
    key: "removeInconsistentValues",
    value: function removeInconsistentValues(a, b) {
      var removed = false;
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.possibilities.get(a)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var value = _step5.value;
          var conflict = false;
          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (var _iterator6 = this.possibilities.get(b)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              var poss = _step6.value;

              if (poss !== value) {
                conflict = true;
                break;
              }
            }
          } catch (err) {
            _didIteratorError6 = true;
            _iteratorError6 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
                _iterator6["return"]();
              }
            } finally {
              if (_didIteratorError6) {
                throw _iteratorError6;
              }
            }
          }

          if (!conflict) {
            var index = this.possibilities.get(a).indexOf(value);
            this.possibilities.get(a).splice(index, 1);
            removed = true;
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return removed;
    } // MRV : On choisit la cellule (variable) avec le moins de possibilité.

  }, {
    key: "selectUnassignedVariables",
    value: function selectUnassignedVariables(assignement) {
      var unassigned = this.variables.filter(function (v) {
        return _toConsumableArray(assignement.keys()).indexOf(v) === -1;
      });
      var min = 10;
      var minV = undefined;
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = this.possibilities[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var _step7$value = _slicedToArray(_step7.value, 2),
              variable = _step7$value[0],
              poss = _step7$value[1];

          if (unassigned.indexOf(variable) === -1) continue;

          if (poss.length <= min) {
            min = poss.length;
            minV = variable;
          }
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
            _iterator7["return"]();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
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

  }, {
    key: "conflicts",
    value: function conflicts(variable, value) {
      var nbConflicts = 0;
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = this.neighbors.get(variable)[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var neighbor = _step8.value;

          // Si l'intersection des deux possibilités n'est pas vide
          if (this.possibilities.get(neighbor).length > 1 && this.possibilities.get(neighbor).indexOf(value) !== -1) {
            nbConflicts++;
          }
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
            _iterator8["return"]();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      return nbConflicts;
    } // LCV : On choisit une valeur qui à le moins d'impact sur les variables voisines

  }, {
    key: "orderDomainsValues",
    value: function orderDomainsValues(variable) {
      var _this = this;

      var poss = this.possibilities.get(variable);
      return poss.sort(function (a, b) {
        return _this.conflicts(variable, a) - _this.conflicts(variable, b);
      });
    }
    /**
     * On s'assure que la variable n'est pas inconsistente avec les assignements
     * @param assignement
     * @param variable
     * @param value
     */

  }, {
    key: "isConsistent",
    value: function isConsistent(assignement, variable, value) {
      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = assignement[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var _step9$value = _slicedToArray(_step9.value, 2),
              _variable = _step9$value[0],
              _value = _step9$value[1];

          // si deux variables ont la même valeur et qu'elles sont voisines alors inconsistent.
          if (_value === value && this.neighbors.get(variable).indexOf(_variable) !== -1) {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
            _iterator9["return"]();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }

      return true;
    }
  }, {
    key: "assign",
    value: function assign(assignement, variable, value) {
      assignement.set(variable, value);
      this.forwardCheck(assignement, variable, value);
    }
    /**
     * On enlève dans la liste des possibilités des cellules voisines la valeur qu'on vient d'attribuer à la variable
     * @param assignement
     * @param variable
     * @param value
     */

  }, {
    key: "forwardCheck",
    value: function forwardCheck(assignement, variable, value) {
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = this.neighbors.get(variable)[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var neighbor = _step10.value;

          if (_toConsumableArray(assignement.keys()).indexOf(neighbor) === -1) {
            var index = this.possibilities.get(neighbor).indexOf(value);

            if (index !== -1) {
              this.possibilities.get(neighbor).slice(index, 1);
            }
          }
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
            _iterator10["return"]();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }
    }
  }, {
    key: "remove",
    value: function remove(assignement, variable) {
      assignement["delete"](variable);
    }
    /**
     * Pseudo code : https://www.cpp.edu/~ftang/courses/CS420/notes/CSP.pdf
     * @param assignement
     */

  }, {
    key: "backtracking",
    value: function backtracking(assignement) {
      if (assignement.size === this.variables.length) {
        return assignement;
      }

      var variable = this.selectUnassignedVariables(assignement);
      var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = this.orderDomainsValues(variable)[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var value = _step11.value;

          if (this.isConsistent(assignement, variable, value)) {
            this.assign(assignement, variable, value);
            var result = this.backtracking(assignement);

            if (result) {
              return result;
            }

            this.remove(assignement, variable);
          }
        }
      } catch (err) {
        _didIteratorError11 = true;
        _iteratorError11 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
            _iterator11["return"]();
          }
        } finally {
          if (_didIteratorError11) {
            throw _iteratorError11;
          }
        }
      }

      return false;
    }
  }, {
    key: "clearPossibilities",
    value: function clearPossibilities(possibilites) {
      var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = possibilites.keys()[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var key = _step12.value;
          possibilites.set(key, [0]);
        }
      } catch (err) {
        _didIteratorError12 = true;
        _iteratorError12 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
            _iterator12["return"]();
          }
        } finally {
          if (_didIteratorError12) {
            throw _iteratorError12;
          }
        }
      }
    }
  }, {
    key: "process",
    value: function process() {
      if (this.ac3()) {
        // on vérifie si le sudoku est complet
        var isFinished = _toConsumableArray(this.possibilities.values()).filter(function (v) {
          return v.length !== 1;
        }).length === 0;

        if (!isFinished) {
          var assignement = new Map();
          var _iteratorNormalCompletion13 = true;
          var _didIteratorError13 = false;
          var _iteratorError13 = undefined;

          try {
            for (var _iterator13 = this.variables[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
              var v = _step13.value;

              if (this.possibilities.get(v).length === 1) {
                assignement.set(v, this.possibilities.get(v)[0]);
              }

              assignement = this.backtracking(assignement);

              if (!assignement) {
                this.clearPossibilities(this.possibilities);
                return [false, this.possibilities];
              }

              var _iteratorNormalCompletion14 = true;
              var _didIteratorError14 = false;
              var _iteratorError14 = undefined;

              try {
                for (var _iterator14 = assignement[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                  var _step14$value = _slicedToArray(_step14.value, 2),
                      variable = _step14$value[0],
                      value = _step14$value[1];

                  this.possibilities.set(variable, [value]);
                }
              } catch (err) {
                _didIteratorError14 = true;
                _iteratorError14 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion14 && _iterator14["return"] != null) {
                    _iterator14["return"]();
                  }
                } finally {
                  if (_didIteratorError14) {
                    throw _iteratorError14;
                  }
                }
              }
            }
          } catch (err) {
            _didIteratorError13 = true;
            _iteratorError13 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion13 && _iterator13["return"] != null) {
                _iterator13["return"]();
              }
            } finally {
              if (_didIteratorError13) {
                throw _iteratorError13;
              }
            }
          }
        }

        return [true, this.possibilities];
      }

      this.clearPossibilities(this.possibilities);
      return [false, this.possibilities];
    }
  }]);

  return SudokuSolver;
}(); // UTILITY FUNCTIONS


var cross = function cross(A, B) {
  var res = new Array();
  var _iteratorNormalCompletion15 = true;
  var _didIteratorError15 = false;
  var _iteratorError15 = undefined;

  try {
    for (var _iterator15 = A[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
      var _a = _step15.value;
      var _iteratorNormalCompletion16 = true;
      var _didIteratorError16 = false;
      var _iteratorError16 = undefined;

      try {
        for (var _iterator16 = B[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
          var _b = _step16.value;
          res.push(_a + "" + _b);
        }
      } catch (err) {
        _didIteratorError16 = true;
        _iteratorError16 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion16 && _iterator16["return"] != null) {
            _iterator16["return"]();
          }
        } finally {
          if (_didIteratorError16) {
            throw _iteratorError16;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError15 = true;
    _iteratorError15 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion15 && _iterator15["return"] != null) {
        _iterator15["return"]();
      }
    } finally {
      if (_didIteratorError15) {
        throw _iteratorError15;
      }
    }
  }

  return res;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9TdWRva3VTb2x2ZXIudHMiXSwibmFtZXMiOlsiQk9YX1NJWkUiLCJTSVpFIiwiQ09MVU1OUyIsIlJPV1MiLCJTdWRva3UiLCJjZWxscyIsIk1hcCIsInJvb3RJbnB1dCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImlucHV0cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiaW5wdXQiLCJ4IiwiZ2V0QXR0cmlidXRlIiwidW5kZWZpbmVkIiwieSIsInZhbHVlIiwic2V0IiwicGFyc2VJbnQiLCJpZCIsImdldCIsInRvU3RyaW5nIiwiJHJlc3VsdFRpdGxlIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiJGxvYWRpbmdCb3giLCIkc3Vkb2t1VGFibGUiLCJhZGQiLCJnZXRCb2FyZEZyb21IdG1sIiwic3Vkb2t1U29sdmVyIiwiU3Vkb2t1U29sdmVyIiwicHJvY2VzcyIsImlzUmVzb2x2ZWQiLCJyZXNvbHZlZENlbGxzIiwiaW5uZXJIVE1MIiwiZGlzcGxheUJvYXJkIiwibGV2ZWwiLCJncmlkIiwiSlNPTiIsInBhcnNlIiwiYm9hcmQiLCJ2YXJpYWJsZXMiLCJjcm9zcyIsIm5laWdoYm9ycyIsInBvc3NpYmlsaXRpZXMiLCJiaW5hcnlfY29uc3RyYWludHMiLCJBcnJheSIsInZhcmlhYmxlIiwicm93X2NvbnN0cmFpbnRzIiwiYm94X2NvbnN0cmFpbnRzIiwiY29sdW1uX2NvbnN0cmFpbnRzIiwiaSIsImxlbmd0aCIsInB1c2giLCJfYmkiLCJfYmoiLCJjIiwicGVybXV0YXRpb25zIiwidiIsInF1ZXVlIiwicG9wIiwiYSIsImIiLCJyZW1vdmVJbmNvbnNpc3RlbnRWYWx1ZXMiLCJuIiwicmVtb3ZlZCIsImNvbmZsaWN0IiwicG9zcyIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsImFzc2lnbmVtZW50IiwidW5hc3NpZ25lZCIsImZpbHRlciIsImtleXMiLCJtaW4iLCJtaW5WIiwibmJDb25mbGljdHMiLCJuZWlnaGJvciIsInNvcnQiLCJjb25mbGljdHMiLCJfdmFyaWFibGUiLCJfdmFsdWUiLCJmb3J3YXJkQ2hlY2siLCJzbGljZSIsInNpemUiLCJzZWxlY3RVbmFzc2lnbmVkVmFyaWFibGVzIiwib3JkZXJEb21haW5zVmFsdWVzIiwiaXNDb25zaXN0ZW50IiwiYXNzaWduIiwicmVzdWx0IiwiYmFja3RyYWNraW5nIiwicG9zc2liaWxpdGVzIiwia2V5IiwiYWMzIiwiaXNGaW5pc2hlZCIsInZhbHVlcyIsImNsZWFyUG9zc2liaWxpdGllcyIsIkEiLCJCIiwicmVzIiwiX2EiLCJfYiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsUUFBUSxHQUFHLENBQWpCO0FBQ0EsSUFBTUMsSUFBSSxHQUFHRCxRQUFRLEdBQUdBLFFBQXhCO0FBQ0EsSUFBTUUsT0FBZSxHQUFHLFdBQXhCO0FBQ0EsSUFBTUMsSUFBWSxHQUFHLFdBQXJCOztJQUVNQyxNOzs7Ozs7O3VDQUdxRDtBQUN2RCxVQUFJQyxLQUE0QixHQUFHLElBQUlDLEdBQUosRUFBbkM7QUFDQSxVQUFNQyxTQUFTLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixjQUF2QixDQUFsQjtBQUNBLFVBQU1DLE1BQU0sR0FBR0gsU0FBUyxDQUFDSSxnQkFBVixDQUEyQixrQkFBM0IsQ0FBZjtBQUNBRCxNQUFBQSxNQUFNLENBQUNFLE9BQVAsQ0FBZSxVQUFDQyxLQUFELEVBQTZCO0FBQzFDLFlBQU1DLENBQUMsR0FBR0QsS0FBSyxDQUFDRSxZQUFOLENBQW1CLFFBQW5CLENBQVY7QUFDQSxZQUFJVixLQUFLLENBQUNTLENBQUQsQ0FBTCxLQUFhRSxTQUFqQixFQUE0QlgsS0FBSyxDQUFDUyxDQUFELENBQUwsR0FBVyxFQUFYO0FBQzVCLFlBQU1HLENBQUMsR0FBR0osS0FBSyxDQUFDRSxZQUFOLENBQW1CLFFBQW5CLENBQVY7QUFDQSxZQUFNRyxLQUFLLEdBQUdMLEtBQUssQ0FBQ0ssS0FBcEI7QUFDQWIsUUFBQUEsS0FBSyxDQUFDYyxH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TCxDQUFtQjNCLEdBQW5CLENBQXVCOEIsUUFBdkIsRUFBaUMsQ0FBQy9CLEtBQUQsQ0FBakM7QUFDRDtBQWI2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBYy9CO0FBaEJjO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFpQmhCOztBQUNELGVBQU8sQ0FBQyxJQUFELEVBQU8sS0FBSzRCLGFBQVosQ0FBUDtBQUNEOztBQUNELFdBQUtxRCxrQkFBTCxDQUF3QixLQUFLckQsYUFBN0I7QUFDQSxhQUFPLENBQUMsS0FBRCxFQUFRLEtBQUtBLGFBQWIsQ0FBUDtBQUNEOzs7O0tBR0g7OztBQUVBLElBQU1GLEtBQUssR0FBRyxTQUFSQSxLQUFRLENBQUN3RCxDQUFELEVBQVlDLENBQVosRUFBeUM7QUFDckQsTUFBSUMsR0FBRyxHQUFHLElBQUl0RCxLQUFKLEVBQVY7QUFEcUQ7QUFBQTtBQUFBOztBQUFBO0FBRXJELDJCQUFlb0QsQ0FBZix3SUFBa0I7QUFBQSxVQUFURyxFQUFTO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ2hCLCtCQUFlRixDQUFmLHdJQUFrQjtBQUFBLGNBQVRHLEVBQVM7QUFDaEJGLFVBQUFBLEdBQUcsQ0FBQy9DLElBQUosQ0FBU2dELEVBQUUsR0FBRyxFQUFMLEdBQVVDLEVBQW5CO0FBQ0Q7QUFIZTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSWpCO0FBTm9EO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBT3JELFNBQU9GLEdBQVA7QUFDRCxDQVJEIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQk9YX1NJWkUgPSAzO1xuY29uc3QgU0laRSA9IEJPWF9TSVpFICogQk9YX1NJWkU7XG5jb25zdCBDT0xVTU5TOiBzdHJpbmcgPSBcIjAxMjM0NTY3OFwiO1xuY29uc3QgUk9XUzogc3RyaW5nID0gXCJBQkNERUZHSElcIjtcblxuY2xhc3MgU3Vkb2t1IHtcbiAgc3RhdGljIHN1ZG9rdVNvbHZlcjogU3Vkb2t1U29sdmVyO1xuXG4gIHByaXZhdGUgc3RhdGljIGdldEJvYXJkRnJvbUh0bWwoKTogTWFwPHN0cmluZywgbnVtYmVyW10+IHtcbiAgICBsZXQgY2VsbHM6IE1hcDxzdHJpbmcsIG51bWJlcltdPiA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCByb290SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N1ZG9rdUlucHV0XCIpO1xuICAgIGNvbnN0IGlucHV0cyA9IHJvb3RJbnB1dC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbdHlwZT10ZXh0XVwiKTtcbiAgICBpbnB1dHMuZm9yRWFjaCgoaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHggPSBpbnB1dC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXhcIik7XG4gICAgICBpZiAoY2VsbHNbeF0gPT09IHVuZGVmaW5lZCkgY2VsbHNbeF0gPSBbXTtcbiAgICAgIGNvbnN0IHkgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXlcIik7XG4gICAgICBjb25zdCB2YWx1ZSA9IGlucHV0LnZhbHVlO1xuICAgICAgY2VsbHMuc2V0KHkgKyBcIlwiICsgeCwgdmFsdWUgPT09IFwiXCIgPyBbMF0gOiBbcGFyc2VJbnQodmFsdWUpXSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGNlbGxzO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZGlzcGxheUJvYXJkKGNlbGxzOiBNYXA8c3RyaW5nLCBudW1iZXJbXT4sIGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCByb290SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGlkKTtcbiAgICBjb25zdCBpbnB1dHMgPSByb290SW5wdXQucXVlcnlTZWxlY3RvckFsbChcImlucHV0W3R5cGU9dGV4dF1cIik7XG4gICAgaW5wdXRzLmZvckVhY2goKGlucHV0OiBIVE1MSW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICBjb25zdCB4ID0gaW5wdXQuZ2V0QXR0cmlidXRlKFwiZGF0YS14XCIpO1xuICAgICAgY29uc3QgeSA9IGlucHV0LmdldEF0dHJpYnV0ZShcImRhdGEteVwiKTtcbiAgICAgIGlucHV0LnZhbHVlID1cbiAgICAgICAgY2VsbHMuZ2V0KHkgKyBcIlwiICsgeClbMF0gIT09IDAgPyBjZWxscy5nZXQoeSArIFwiXCIgKyB4KS50b1N0cmluZygpIDogXCJcIjtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyByZXNvbHZlKCkge1xuICAgIGxldCAkcmVzdWx0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc3VsdC10aXRsZVwiKTtcbiAgICAkcmVzdWx0VGl0bGUuY2xhc3NMaXN0LnJlbW92ZShcIm5vdC1yZXNvbHZlZFwiLCBcInJlc29sdmVkXCIpO1xuICAgIGxldCAkbG9hZGluZ0JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9hZGVyLWJveFwiKTtcbiAgICBsZXQgJHN1ZG9rdVRhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdWRva3VTb2x1dGlvblwiKTtcbiAgICAkc3Vkb2t1VGFibGUuY2xhc3NMaXN0LmFkZChcImxvYWRpbmdcIik7XG4gICAgJGxvYWRpbmdCb3guY2xhc3NMaXN0LmFkZChcImlzLWxvYWRpbmdcIik7XG4gICAgbGV0IGNlbGxzID0gU3Vkb2t1LmdldEJvYXJkRnJvbUh0bWwoKTtcblxuICAgIHRoaXMuc3Vkb2t1U29sdmVyID0gbmV3IFN1ZG9rdVNvbHZlcihjZWxscyk7XG4gICAgY29uc3QgW2lzUmVzb2x2ZWQsIHJlc29sdmVkQ2VsbHNdID0gdGhpcy5zdWRva3VTb2x2ZXIucHJvY2VzcygpO1xuICAgICRzdWRva3VUYWJsZS5jbGFzc0xpc3QucmVtb3ZlKFwibG9hZGluZ1wiKTtcbiAgICAkbG9hZGluZ0JveC5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtbG9hZGluZ1wiKTtcbiAgICBpZiAoIWlzUmVzb2x2ZWQpIHtcbiAgICAgICRyZXN1bHRUaXRsZS5pbm5lckhUTUwgPSBcIk5vbiByw6lzb2x2YWJsZS5cIjtcbiAgICAgICRyZXN1bHRUaXRsZS5jbGFzc0xpc3QuYWRkKFwibm90LXJlc29sdmVkXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAkcmVzdWx0VGl0bGUuaW5uZXJIVE1MID0gXCJSw6lzb2x1LiDwn5iOXCI7XG4gICAgJHJlc3VsdFRpdGxlLmNsYXNzTGlzdC5hZGQoXCJyZXNvbHZlZFwiKTtcbiAgICBTdWRva3UuZGlzcGxheUJvYXJkKHJlc29sdmVkQ2VsbHMsIFwiI3N1ZG9rdVNvbHV0aW9uXCIpO1xuICAgIC8vIE9uIGFmZmljaGUgbGUgc3Vkb2t1IHN1ciBsYSBwYXJ0aWUgZHJvaXRlIGRlIGwnw6ljcmFuLlxuICB9XG5cbiAgc3RhdGljIGdlbmVyYXRlU3Vkb2t1KGxldmVsOiBudW1iZXIpIHtcbiAgICBsZXQgZ3JpZDogc3RyaW5nO1xuICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgZ3JpZCA9XG4gICAgICAgICdbW1wiQTBcIixbMF1dLFtcIkExXCIsWzBdXSxbXCJBMlwiLFswXV0sW1wiQTNcIixbMl1dLFtcIkE0XCIsWzZdXSxbXCJBNVwiLFswXV0sW1wiQTZcIixbN11dLFtcIkE3XCIsWzBdXSxbXCJBOFwiLFsxXV0sW1wiQjBcIixbNl1dLFtcIkIxXCIsWzhdXSxbXCJCMlwiLFswXV0sW1wiQjNcIixbMF1dLFtcIkI0XCIsWzddXSxbXCJCNVwiLFswXV0sW1wiQjZcIixbMF1dLFtcIkI3XCIsWzldXSxbXCJCOFwiLFswXV0sW1wiQzBcIixbMV1dLFtcIkMxXCIsWzldXSxbXCJDMlwiLFswXV0sW1wiQzNcIixbMF1dLFtcIkM0XCIsWzBdXSxbXCJDNVwiLFs0XV0sW1wiQzZcIixbNV1dLFtcIkM3XCIsWzBdXSxbXCJDOFwiLFswXV0sW1wiRDBcIixbOF1dLFtcIkQxXCIsWzJdXSxbXCJEMlwiLFswXV0sW1wiRDNcIixbMV1dLFtcIkQ0XCIsWzBdXSxbXCJENVwiLFswXV0sW1wiRDZcIixbMF1dLFtcIkQ3XCIsWzRdXSxbXCJEOFwiLFswXV0sW1wiRTBcIixbMF1dLFtcIkUxXCIsWzBdXSxbXCJFMlwiLFs0XV0sW1wiRTNcIixbNl1dLFtcIkU0XCIsWzBdXSxbXCJFNVwiLFsyXV0sW1wiRTZcIixbOV1dLFtcIkU3XCIsWzBdXSxbXCJFOFwiLFswXV0sW1wiRjBcIixbMF1dLFtcIkYxXCIsWzVdXSxbXCJGMlwiLFswXV0sW1wiRjNcIixbMF1dLFtcIkY0XCIsWzBdXSxbXCJGNVwiLFszXV0sW1wiRjZcIixbMF1dLFtcIkY3XCIsWzJdXSxbXCJGOFwiLFs4XV0sW1wiRzBcIixbMF1dLFtcIkcxXCIsWzBdXSxbXCJHMlwiLFs5XV0sW1wiRzNcIixbM11dLFtcIkc0XCIsWzBdXSxbXCJHNVwiLFswXV0sW1wiRzZcIixbMF1dLFtcIkc3XCIsWzddXSxbXCJHOFwiLFs0XV0sW1wiSDBcIixbMF1dLFtcIkgxXCIsWzRdXSxbXCJIMlwiLFswXV0sW1wiSDNcIixbMF1dLFtcIkg0XCIsWzVdXSxbXCJINVwiLFswXV0sW1wiSDZcIixbMF1dLFtcIkg3XCIsWzNdXSxbXCJIOFwiLFs2XV0sW1wiSTBcIixbN11dLFtcIkkxXCIsWzBdXSxbXCJJMlwiLFszXV0sW1wiSTNcIixbMF1dLFtcIkk0XCIsWzFdXSxbXCJJNVwiLFs4XV0sW1wiSTZcIixbMF1dLFtcIkk3XCIsWzBdXSxbXCJJOFwiLFswXV1dJztcbiAgICB9IGVsc2UgaWYgKGxldmVsID09PSAxKSB7XG4gICAgICBncmlkID1cbiAgICAgICAgJ1tbXCJBMFwiLFs1XV0sW1wiQTFcIixbMF1dLFtcIkEyXCIsWzFdXSxbXCJBM1wiLFswXV0sW1wiQTRcIixbMF1dLFtcIkE1XCIsWzBdXSxbXCJBNlwiLFs2XV0sW1wiQTdcIixbMF1dLFtcIkE4XCIsWzRdXSxbXCJCMFwiLFswXV0sW1wiQjFcIixbOV1dLFtcIkIyXCIsWzBdXSxbXCJCM1wiLFszXV0sW1wiQjRcIixbMF1dLFtcIkI1XCIsWzZdXSxbXCJCNlwiLFswXV0sW1wiQjdcIixbNV1dLFtcIkI4XCIsWzBdXSxbXCJDMFwiLFswXV0sW1wiQzFcIixbMF1dLFtcIkMyXCIsWzBdXSxbXCJDM1wiLFswXV0sW1wiQzRcIixbOV1dLFtcIkM1XCIsWzBdXSxbXCJDNlwiLFswXV0sW1wiQzdcIixbMF1dLFtcIkM4XCIsWzBdXSxbXCJEMFwiLFs0XV0sW1wiRDFcIixbMF1dLFtcIkQyXCIsWzBdXSxbXCJEM1wiLFswXV0sW1wiRDRcIixbMF1dLFtcIkQ1XCIsWzBdXSxbXCJENlwiLFswXV0sW1wiRDdcIixbMF1dLFtcIkQ4XCIsWzldXSxbXCJFMFwiLFswXV0sW1wiRTFcIixbMF1dLFtcIkUyXCIsWzBdXSxbXCJFM1wiLFsxXV0sW1wiRTRcIixbMF1dLFtcIkU1XCIsWzldXSxbXCJFNlwiLFswXV0sW1wiRTdcIixbMF1dLFtcIkU4XCIsWzBdXSxbXCJGMFwiLFs3XV0sW1wiRjFcIixbMF1dLFtcIkYyXCIsWzBdXSxbXCJGM1wiLFswXV0sW1wiRjRcIixbMF1dLFtcIkY1XCIsWzBdXSxbXCJGNlwiLFswXV0sW1wiRjdcIixbMF1dLFtcIkY4XCIsWzZdXSxbXCJHMFwiLFswXV0sW1wiRzFcIixbMF1dLFtcIkcyXCIsWzBdXSxbXCJHM1wiLFswXV0sW1wiRzRcIixbMl1dLFtcIkc1XCIsWzBdXSxbXCJHNlwiLFswXV0sW1wiRzdcIixbMF1dLFtcIkc4XCIsWzBdXSxbXCJIMFwiLFswXV0sW1wiSDFcIixbOF1dLFtcIkgyXCIsWzBdXSxbXCJIM1wiLFs1XV0sW1wiSDRcIixbMF1dLFtcIkg1XCIsWzddXSxbXCJINlwiLFswXV0sW1wiSDdcIixbNl1dLFtcIkg4XCIsWzBdXSxbXCJJMFwiLFsxXV0sW1wiSTFcIixbMF1dLFtcIkkyXCIsWzNdXSxbXCJJM1wiLFswXV0sW1wiSTRcIixbMF1dLFtcIkk1XCIsWzBdXSxbXCJJNlwiLFs3XV0sW1wiSTdcIixbMF1dLFtcIkk4XCIsWzJdXV0nO1xuICAgIH0gZWxzZSBpZiAobGV2ZWwgPT09IDIpIHtcbiAgICAgIGdyaWQgPVxuICAgICAgICAnW1tcIkEwXCIsWzBdXSxbXCJBMVwiLFswXV0sW1wiQTJcIixbMF1dLFtcIkEzXCIsWzBdXSxbXCJBNFwiLFswXV0sW1wiQTVcIixbMF1dLFtcIkE2XCIsWzBdXSxbXCJBN1wiLFswXV0sW1wiQThcIixbMF1dLFtcIkIwXCIsWzBdXSxbXCJCMVwiLFswXV0sW1wiQjJcIixbMF1dLFtcIkIzXCIsWzBdXSxbXCJCNFwiLFswXV0sW1wiQjVcIixbM11dLFtcIkI2XCIsWzBdXSxbXCJCN1wiLFs4XV0sW1wiQjhcIixbNV1dLFtcIkMwXCIsWzBdXSxbXCJDMVwiLFswXV0sW1wiQzJcIixbMV1dLFtcIkMzXCIsWzBdXSxbXCJDNFwiLFsyXV0sW1wiQzVcIixbMF1dLFtcIkM2XCIsWzBdXSxbXCJDN1wiLFswXV0sW1wiQzhcIixbMF1dLFtcIkQwXCIsWzBdXSxbXCJEMVwiLFswXV0sW1wiRDJcIixbMF1dLFtcIkQzXCIsWzVdXSxbXCJENFwiLFswXV0sW1wiRDVcIixbN11dLFtcIkQ2XCIsWzBdXSxbXCJEN1wiLFswXV0sW1wiRDhcIixbMF1dLFtcIkUwXCIsWzBdXSxbXCJFMVwiLFswXV0sW1wiRTJcIixbNF1dLFtcIkUzXCIsWzBdXSxbXCJFNFwiLFswXV0sW1wiRTVcIixbMF1dLFtcIkU2XCIsWzFdXSxbXCJFN1wiLFswXV0sW1wiRThcIixbMF1dLFtcIkYwXCIsWzBdXSxbXCJGMVwiLFs5XV0sW1wiRjJcIixbMF1dLFtcIkYzXCIsWzBdXSxbXCJGNFwiLFswXV0sW1wiRjVcIixbMF1dLFtcIkY2XCIsWzBdXSxbXCJGN1wiLFswXV0sW1wiRjhcIixbMF1dLFtcIkcwXCIsWzVdXSxbXCJHMVwiLFswXV0sW1wiRzJcIixbMF1dLFtcIkczXCIsWzBdXSxbXCJHNFwiLFswXV0sW1wiRzVcIixbMF1dLFtcIkc2XCIsWzBdXSxbXCJHN1wiLFs3XV0sW1wiRzhcIixbM11dLFtcIkgwXCIsWzBdXSxbXCJIMVwiLFswXV0sW1wiSDJcIixbMl1dLFtcIkgzXCIsWzBdXSxbXCJINFwiLFsxXV0sW1wiSDVcIixbMF1dLFtcIkg2XCIsWzBdXSxbXCJIN1wiLFswXV0sW1wiSDhcIixbMF1dLFtcIkkwXCIsWzBdXSxbXCJJMVwiLFswXV0sW1wiSTJcIixbMF1dLFtcIkkzXCIsWzBdXSxbXCJJNFwiLFs0XV0sW1wiSTVcIixbMF1dLFtcIkk2XCIsWzBdXSxbXCJJN1wiLFswXV0sW1wiSThcIixbOV1dXSc7XG4gICAgfVxuICAgIHRoaXMuZGlzcGxheUJvYXJkKG5ldyBNYXAoSlNPTi5wYXJzZShncmlkKSksIFwiI3N1ZG9rdUlucHV0XCIpO1xuICB9XG59XG5cbmNsYXNzIFN1ZG9rdVNvbHZlciB7XG4gIGJvYXJkOiBNYXA8c3RyaW5nLCBudW1iZXJbXT47XG4gIHZhcmlhYmxlczogQXJyYXk8c3RyaW5nPjtcbiAgYmluYXJ5X2NvbnN0cmFpbnRzOiBBcnJheTxBcnJheTxzdHJpbmc+PjtcbiAgbmVpZ2hib3JzOiBNYXA8c3RyaW5nLCBBcnJheTxzdHJpbmc+PjtcbiAgcG9zc2liaWxpdGllczogTWFwPHN0cmluZywgQXJyYXk8bnVtYmVyPj47XG5cbiAgY29uc3RydWN0b3IoYm9hcmQ6IE1hcDxzdHJpbmcsIG51bWJlcltdPikge1xuICAgIHRoaXMuYm9hcmQgPSBib2FyZDtcbiAgICB0aGlzLnZhcmlhYmxlcyA9IGNyb3NzKFJPV1MsIENPTFVNTlMpO1xuICAgIHRoaXMubmVpZ2hib3JzID0gbmV3IE1hcCgpO1xuICAgIHRoaXMucG9zc2liaWxpdGllcyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLmJpbmFyeV9jb25zdHJhaW50cyA9IG5ldyBBcnJheSgpO1xuXG4gICAgLy8gR0VORVJBVElPTiBERVMgUE9TU0lCSUxJVEVTXG5cbiAgICBmb3IgKGNvbnN0IFt2YXJpYWJsZSwgdmFsdWVdIG9mIHRoaXMuYm9hcmQpIHtcbiAgICAgIHRoaXMucG9zc2liaWxpdGllcy5zZXQoXG4gICAgICAgIHZhcmlhYmxlLFxuICAgICAgICB2YWx1ZVswXSA9PT0gMCA/IFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5XSA6IHZhbHVlXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIEdFTkVSQVRJT04gREVTIENPTlRSQUlOVEVTXG5cbiAgICBsZXQgcm93X2NvbnN0cmFpbnRzID0gbmV3IEFycmF5PEFycmF5PHN0cmluZz4+KCk7XG4gICAgbGV0IGJveF9jb25zdHJhaW50cyA9IG5ldyBBcnJheTxBcnJheTxzdHJpbmc+PigpO1xuICAgIGxldCBjb2x1bW5fY29uc3RyYWludHMgPSBuZXcgQXJyYXk8QXJyYXk8c3RyaW5nPj4oKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgUk9XUy5sZW5ndGg7IGkrKykge1xuICAgICAgY29sdW1uX2NvbnN0cmFpbnRzLnB1c2goY3Jvc3MoUk9XU1tpXSwgQ09MVU1OUykpO1xuICAgICAgcm93X2NvbnN0cmFpbnRzLnB1c2goY3Jvc3MoUk9XUywgQ09MVU1OU1tpXSkpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgX2JpIG9mIFtcIkFCQ1wiLCBcIkRFRlwiLCBcIkdISVwiXSkge1xuICAgICAgZm9yIChjb25zdCBfYmogb2YgW1wiMDEyXCIsIFwiMzQ1XCIsIFwiNjc4XCJdKSB7XG4gICAgICAgIGJveF9jb25zdHJhaW50cy5wdXNoKGNyb3NzKF9iaSwgX2JqKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVHJhbnNmb3JtYXRpb24gZW4gY29udHJhaW50ZXMgYmluYWlyZXNcblxuICAgIC8vIExlcyBwZXJtdXRhdGlvbnMgdmllbm5lbnQgbGUgbG9hZGFzaCBldCBzb250IGltcG9ydMOpcyBkYW5zIGxlIEhUTUwuXG4gICAgZm9yIChjb25zdCBjIG9mIGNvbHVtbl9jb25zdHJhaW50cykge1xuICAgICAgdGhpcy5iaW5hcnlfY29uc3RyYWludHMucHVzaCguLi5wZXJtdXRhdGlvbnMoYywgMikpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGMgb2Ygcm93X2NvbnN0cmFpbnRzKSB7XG4gICAgICB0aGlzLmJpbmFyeV9jb25zdHJhaW50cy5wdXNoKC4uLnBlcm11dGF0aW9ucyhjLCAyKSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgYyBvZiBib3hfY29uc3RyYWludHMpIHtcbiAgICAgIHRoaXMuYmluYXJ5X2NvbnN0cmFpbnRzLnB1c2goLi4ucGVybXV0YXRpb25zKGMsIDIpKTtcbiAgICB9XG5cbiAgICAvLyBHRU5FUkFUSU9OIERFUyBWT0lTSU5TXG5cbiAgICBmb3IgKGNvbnN0IHYgb2YgdGhpcy52YXJpYWJsZXMpIHtcbiAgICAgIHRoaXMubmVpZ2hib3JzLnNldCh2LCBuZXcgQXJyYXk8c3RyaW5nPigpKTtcbiAgICAgIGZvciAoY29uc3QgYyBvZiB0aGlzLmJpbmFyeV9jb25zdHJhaW50cykge1xuICAgICAgICBpZiAodiA9PT0gY1swXSkgdGhpcy5uZWlnaGJvcnMuZ2V0KHYpLnB1c2goY1sxXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gSW5zaXBpcmVkIGJ5IGh0dHA6Ly9haW1hLmNzLmJlcmtlbGV5LmVkdS9weXRob24vY3NwLmh0bWwuXG4gIHB1YmxpYyBhYzMoKTogYm9vbGVhbiB7XG4gICAgbGV0IHF1ZXVlID0gWy4uLnRoaXMuYmluYXJ5X2NvbnN0cmFpbnRzXTsgLy8gb24gY2xvbmUgbGVzIGNvbnRyYWludGVzIGJpbmFpcmVzLlxuXG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgY29uc3QgW2EsIGJdID0gcXVldWUucG9wKCk7XG5cbiAgICAgIGlmICh0aGlzLnJlbW92ZUluY29uc2lzdGVudFZhbHVlcyhhLCBiKSkge1xuICAgICAgICBpZiAodGhpcy5wb3NzaWJpbGl0aWVzLmdldChhKS5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcblxuICAgICAgICBmb3IgKGNvbnN0IG4gb2YgdGhpcy5uZWlnaGJvcnMuZ2V0KGEpKSB7XG4gICAgICAgICAgaWYgKG4gIT09IGEpIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goW24sIGFdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogT24gdsOpcmlmaWUgcydpbCB5IGEgZGVzIHZhbGV1cnMgcG9zc2libGVzIGNvbW11bmVzIGV0cmUgYSBldCBiLCBzaSBvdWkgb24gZW5sw6h2ZSBsYSBwb3NzaWJpbHRpw6kgZGFucyBhLlxuICAgKiBAcGFyYW0gYVxuICAgKiBAcGFyYW0gYlxuICAgKiBAcmV0dXJucyBzaSB1bmUgdmFsZXVyIMOgIMOpdMOpIHN1cHByaW3DqWUuXG4gICAqL1xuICBwcml2YXRlIHJlbW92ZUluY29uc2lzdGVudFZhbHVlcyhhOiBzdHJpbmcsIGI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGxldCByZW1vdmVkID0gZmFsc2U7XG4gICAgZm9yIChjb25zdCB2YWx1ZSBvZiB0aGlzLnBvc3NpYmlsaXRpZXMuZ2V0KGEpKSB7XG4gICAgICBsZXQgY29uZmxpY3QgPSBmYWxzZTtcbiAgICAgIGZvciAoY29uc3QgcG9zcyBvZiB0aGlzLnBvc3NpYmlsaXRpZXMuZ2V0KGIpKSB7XG4gICAgICAgIGlmIChwb3NzICE9PSB2YWx1ZSkge1xuICAgICAgICAgIGNvbmZsaWN0ID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFjb25mbGljdCkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMucG9zc2liaWxpdGllcy5nZXQoYSkuaW5kZXhPZih2YWx1ZSk7XG4gICAgICAgIHRoaXMucG9zc2liaWxpdGllcy5nZXQoYSkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZW1vdmVkO1xuICB9XG5cbiAgLy8gTVJWIDogT24gY2hvaXNpdCBsYSBjZWxsdWxlICh2YXJpYWJsZSkgYXZlYyBsZSBtb2lucyBkZSBwb3NzaWJpbGl0w6kuXG4gIHByaXZhdGUgc2VsZWN0VW5hc3NpZ25lZFZhcmlhYmxlcyhhc3NpZ25lbWVudDogTWFwPHN0cmluZywgbnVtYmVyPik6IHN0cmluZyB7XG4gICAgY29uc3QgdW5hc3NpZ25lZCA9IHRoaXMudmFyaWFibGVzLmZpbHRlcihcbiAgICAgIHYgPT4gWy4uLmFzc2lnbmVtZW50LmtleXMoKV0uaW5kZXhPZih2KSA9PT0gLTFcbiAgICApO1xuICAgIGxldCBtaW4gPSAxMDtcbiAgICBsZXQgbWluViA9IHVuZGVmaW5lZDtcbiAgICBmb3IgKGNvbnN0IFt2YXJpYWJsZSwgcG9zc10gb2YgdGhpcy5wb3NzaWJpbGl0aWVzKSB7XG4gICAgICBpZiAodW5hc3NpZ25lZC5pbmRleE9mKHZhcmlhYmxlKSA9PT0gLTEpIGNvbnRpbnVlO1xuICAgICAgaWYgKHBvc3MubGVuZ3RoIDw9IG1pbikge1xuICAgICAgICBtaW4gPSBwb3NzLmxlbmd0aDtcbiAgICAgICAgbWluViA9IHZhcmlhYmxlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWluVjtcbiAgfVxuXG4gIC8qKlxuICAgKiBPbiBjYWxjdWwgbGVzIGNvbmZsaXRzIGV4aXN0YW50cyBhdmVjIGxlcyBjZWxsdWxlcyB2b2lzaW5lcy5cbiAgICogRXN0IHV0aWxpc8OpIGRhbnMgTENWLlxuICAgKiBAcGFyYW0gdmFyaWFibGVcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBwcml2YXRlIGNvbmZsaWN0cyh2YXJpYWJsZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBsZXQgbmJDb25mbGljdHMgPSAwO1xuICAgIGZvciAobGV0IG5laWdoYm9yIG9mIHRoaXMubmVpZ2hib3JzLmdldCh2YXJpYWJsZSkpIHtcbiAgICAgIC8vIFNpIGwnaW50ZXJzZWN0aW9uIGRlcyBkZXV4IHBvc3NpYmlsaXTDqXMgbidlc3QgcGFzIHZpZGVcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5wb3NzaWJpbGl0aWVzLmdldChuZWlnaGJvcikubGVuZ3RoID4gMSAmJlxuICAgICAgICB0aGlzLnBvc3NpYmlsaXRpZXMuZ2V0KG5laWdoYm9yKS5pbmRleE9mKHZhbHVlKSAhPT0gLTFcbiAgICAgICkge1xuICAgICAgICBuYkNvbmZsaWN0cysrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmJDb25mbGljdHM7XG4gIH1cblxuICAvLyBMQ1YgOiBPbiBjaG9pc2l0IHVuZSB2YWxldXIgcXVpIMOgIGxlIG1vaW5zIGQnaW1wYWN0IHN1ciBsZXMgdmFyaWFibGVzIHZvaXNpbmVzXG4gIHByaXZhdGUgb3JkZXJEb21haW5zVmFsdWVzKHZhcmlhYmxlOiBzdHJpbmcpOiBudW1iZXJbXSB7XG4gICAgbGV0IHBvc3MgPSB0aGlzLnBvc3NpYmlsaXRpZXMuZ2V0KHZhcmlhYmxlKTtcbiAgICByZXR1cm4gcG9zcy5zb3J0KChhOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5jb25mbGljdHModmFyaWFibGUsIGEpIC0gdGhpcy5jb25mbGljdHModmFyaWFibGUsIGIpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIHMnYXNzdXJlIHF1ZSBsYSB2YXJpYWJsZSBuJ2VzdCBwYXMgaW5jb25zaXN0ZW50ZSBhdmVjIGxlcyBhc3NpZ25lbWVudHNcbiAgICogQHBhcmFtIGFzc2lnbmVtZW50XG4gICAqIEBwYXJhbSB2YXJpYWJsZVxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIHByaXZhdGUgaXNDb25zaXN0ZW50KFxuICAgIGFzc2lnbmVtZW50OiBNYXA8c3RyaW5nLCBudW1iZXI+LFxuICAgIHZhcmlhYmxlOiBzdHJpbmcsXG4gICAgdmFsdWU6IG51bWJlclxuICApOiBib29sZWFuIHtcbiAgICBmb3IgKGNvbnN0IFtfdmFyaWFibGUsIF92YWx1ZV0gb2YgYXNzaWduZW1lbnQpIHtcbiAgICAgIC8vIHNpIGRldXggdmFyaWFibGVzIG9udCBsYSBtw6ptZSB2YWxldXIgZXQgcXUnZWxsZXMgc29udCB2b2lzaW5lcyBhbG9ycyBpbmNvbnNpc3RlbnQuXG4gICAgICBpZiAoXG4gICAgICAgIF92YWx1ZSA9PT0gdmFsdWUgJiZcbiAgICAgICAgdGhpcy5uZWlnaGJvcnMuZ2V0KHZhcmlhYmxlKS5pbmRleE9mKF92YXJpYWJsZSkgIT09IC0xXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgYXNzaWduKFxuICAgIGFzc2lnbmVtZW50OiBNYXA8c3RyaW5nLCBudW1iZXI+LFxuICAgIHZhcmlhYmxlOiBzdHJpbmcsXG4gICAgdmFsdWU6IG51bWJlclxuICApIHtcbiAgICBhc3NpZ25lbWVudC5zZXQodmFyaWFibGUsIHZhbHVlKTtcblxuICAgIHRoaXMuZm9yd2FyZENoZWNrKGFzc2lnbmVtZW50LCB2YXJpYWJsZSwgdmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIGVubMOodmUgZGFucyBsYSBsaXN0ZSBkZXMgcG9zc2liaWxpdMOpcyBkZXMgY2VsbHVsZXMgdm9pc2luZXMgbGEgdmFsZXVyIHF1J29uIHZpZW50IGQnYXR0cmlidWVyIMOgIGxhIHZhcmlhYmxlXG4gICAqIEBwYXJhbSBhc3NpZ25lbWVudFxuICAgKiBAcGFyYW0gdmFyaWFibGVcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBwcml2YXRlIGZvcndhcmRDaGVjayhcbiAgICBhc3NpZ25lbWVudDogTWFwPHN0cmluZywgbnVtYmVyPixcbiAgICB2YXJpYWJsZTogc3RyaW5nLFxuICAgIHZhbHVlOiBudW1iZXJcbiAgKSB7XG4gICAgZm9yIChjb25zdCBuZWlnaGJvciBvZiB0aGlzLm5laWdoYm9ycy5nZXQodmFyaWFibGUpKSB7XG4gICAgICBpZiAoWy4uLmFzc2lnbmVtZW50LmtleXMoKV0uaW5kZXhPZihuZWlnaGJvcikgPT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wb3NzaWJpbGl0aWVzLmdldChuZWlnaGJvcikuaW5kZXhPZih2YWx1ZSk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICB0aGlzLnBvc3NpYmlsaXRpZXMuZ2V0KG5laWdoYm9yKS5zbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZShhc3NpZ25lbWVudDogTWFwPHN0cmluZywgbnVtYmVyPiwgdmFyaWFibGU6IHN0cmluZykge1xuICAgIGFzc2lnbmVtZW50LmRlbGV0ZSh2YXJpYWJsZSk7XG4gIH1cblxuICAvKipcbiAgICogUHNldWRvIGNvZGUgOiBodHRwczovL3d3dy5jcHAuZWR1L35mdGFuZy9jb3Vyc2VzL0NTNDIwL25vdGVzL0NTUC5wZGZcbiAgICogQHBhcmFtIGFzc2lnbmVtZW50XG4gICAqL1xuICBwcml2YXRlIGJhY2t0cmFja2luZyhhc3NpZ25lbWVudDogTWFwPHN0cmluZywgbnVtYmVyPikge1xuICAgIGlmIChhc3NpZ25lbWVudC5zaXplID09PSB0aGlzLnZhcmlhYmxlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBhc3NpZ25lbWVudDtcbiAgICB9XG4gICAgY29uc3QgdmFyaWFibGUgPSB0aGlzLnNlbGVjdFVuYXNzaWduZWRWYXJpYWJsZXMoYXNzaWduZW1lbnQpO1xuXG4gICAgZm9yIChjb25zdCB2YWx1ZSBvZiB0aGlzLm9yZGVyRG9tYWluc1ZhbHVlcyh2YXJpYWJsZSkpIHtcbiAgICAgIGlmICh0aGlzLmlzQ29uc2lzdGVudChhc3NpZ25lbWVudCwgdmFyaWFibGUsIHZhbHVlKSkge1xuICAgICAgICB0aGlzLmFzc2lnbihhc3NpZ25lbWVudCwgdmFyaWFibGUsIHZhbHVlKTtcblxuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmJhY2t0cmFja2luZyhhc3NpZ25lbWVudCk7XG5cbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmUoYXNzaWduZW1lbnQsIHZhcmlhYmxlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBjbGVhclBvc3NpYmlsaXRpZXMocG9zc2liaWxpdGVzOiBNYXA8c3RyaW5nLCBudW1iZXJbXT4pIHtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBwb3NzaWJpbGl0ZXMua2V5cygpKSB7XG4gICAgICBwb3NzaWJpbGl0ZXMuc2V0KGtleSwgWzBdKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcHJvY2VzcygpOiBbYm9vbGVhbiwgTWFwPHN0cmluZywgbnVtYmVyW10+XSB7XG4gICAgaWYgKHRoaXMuYWMzKCkpIHtcbiAgICAgIC8vIG9uIHbDqXJpZmllIHNpIGxlIHN1ZG9rdSBlc3QgY29tcGxldFxuICAgICAgY29uc3QgaXNGaW5pc2hlZCA9XG4gICAgICAgIFsuLi50aGlzLnBvc3NpYmlsaXRpZXMudmFsdWVzKCldLmZpbHRlcih2ID0+IHYubGVuZ3RoICE9PSAxKS5sZW5ndGggPT09XG4gICAgICAgIDA7XG4gICAgICBpZiAoIWlzRmluaXNoZWQpIHtcbiAgICAgICAgbGV0IGFzc2lnbmVtZW50ID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKTtcbiAgICAgICAgZm9yIChjb25zdCB2IG9mIHRoaXMudmFyaWFibGVzKSB7XG4gICAgICAgICAgaWYgKHRoaXMucG9zc2liaWxpdGllcy5nZXQodikubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBhc3NpZ25lbWVudC5zZXQodiwgdGhpcy5wb3NzaWJpbGl0aWVzLmdldCh2KVswXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGFzc2lnbmVtZW50ID0gdGhpcy5iYWNrdHJhY2tpbmcoYXNzaWduZW1lbnQpO1xuXG4gICAgICAgICAgaWYgKCFhc3NpZ25lbWVudCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhclBvc3NpYmlsaXRpZXModGhpcy5wb3NzaWJpbGl0aWVzKTtcbiAgICAgICAgICAgIHJldHVybiBbZmFsc2UsIHRoaXMucG9zc2liaWxpdGllc107XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZm9yIChjb25zdCBbdmFyaWFibGUsIHZhbHVlXSBvZiBhc3NpZ25lbWVudCkge1xuICAgICAgICAgICAgdGhpcy5wb3NzaWJpbGl0aWVzLnNldCh2YXJpYWJsZSwgW3ZhbHVlXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gW3RydWUsIHRoaXMucG9zc2liaWxpdGllc107XG4gICAgfVxuICAgIHRoaXMuY2xlYXJQb3NzaWJpbGl0aWVzKHRoaXMucG9zc2liaWxpdGllcyk7XG4gICAgcmV0dXJuIFtmYWxzZSwgdGhpcy5wb3NzaWJpbGl0aWVzXTtcbiAgfVxufVxuXG4vLyBVVElMSVRZIEZVTkNUSU9OU1xuXG5jb25zdCBjcm9zcyA9IChBOiBzdHJpbmcsIEI6IHN0cmluZyk6IEFycmF5PHN0cmluZz4gPT4ge1xuICBsZXQgcmVzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcbiAgZm9yIChsZXQgX2Egb2YgQSkge1xuICAgIGZvciAobGV0IF9iIG9mIEIpIHtcbiAgICAgIHJlcy5wdXNoKF9hICsgXCJcIiArIF9iKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG4iXX0=