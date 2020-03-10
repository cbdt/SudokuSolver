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

var Sudoku = /*#__PURE__*/function () {
  function Sudoku() {
    _classCallCheck(this, Sudoku);
  }

  _createClass(Sudoku, null, [{
    key: "getBoardFromHtml",
    value: function getBoardFromHtml() {
      var cells = [];
      var rootInput = document.querySelector("#sudokuInput");
      var inputs = rootInput.querySelectorAll("input[type=text]");
      inputs.forEach(function (input) {
        var x = input.getAttribute("data-x");
        if (cells[x] === undefined) cells[x] = [];
        var y = input.getAttribute("data-y");
        var value = input.value;
        var cell = new Cell(value === "" ? 0 : parseInt(value));
        cells[x][y] = cell;
      });
      return cells;
    }
  }, {
    key: "displayBoard",
    value: function displayBoard(cells) {
      var rootInput = document.querySelector("#sudokuSolution");
      var inputs = rootInput.querySelectorAll("input[type=text]");
      inputs.forEach(function (input) {
        var x = input.getAttribute("data-x");
        if (cells[x] === undefined) cells[x] = [];
        var y = input.getAttribute("data-y");
        input.value = cells[x][y].value !== 0 ? cells[x][y].value : "";
        input.disabled = true;
      });
    }
  }, {
    key: "resolve",
    value: function resolve() {
      var cells = Sudoku.getBoardFromHtml();
      var $resultTitle = document.querySelector(".result-title");
      this.sudokuSolver = new SudokuSolver(cells);

      var _this$sudokuSolver$pr = this.sudokuSolver.process(),
          _this$sudokuSolver$pr2 = _slicedToArray(_this$sudokuSolver$pr, 2),
          isResolved = _this$sudokuSolver$pr2[0],
          resolvedCells = _this$sudokuSolver$pr2[1];

      if (!isResolved) {
        $resultTitle.innerHTML = "Non résolu";
        $resultTitle.classList.add("not resolved");
        return;
      }

      $resultTitle.innerHTML = "Résolu";
      $resultTitle.classList.add("resolved");
      Sudoku.displayBoard(resolvedCells); // On affiche le sudoku sur la partie droite de l'écran.
    }
  }]);

  return Sudoku;
}();

var SudokuSolver = /*#__PURE__*/function () {
  function SudokuSolver(board) {
    _classCallCheck(this, SudokuSolver);

    this.board = board; // On initialise les contraintes initiales.

    for (var x = 0; x < SIZE; x++) {
      for (var y = 0; y < SIZE; y++) {
        this.updateConstraints(x, y);
      }
    }
  }
  /**
   * Ajoute des contraintes à la cellule (x; y).
   * Correspond à enlever les valeurs possibles qui ont déjà été attribué sur la ligne / la colonne / le carré.
   * @param x
   * @param y
   */


  _createClass(SudokuSolver, [{
    key: "updateConstraints",
    value: function updateConstraints(x, y) {
      var cell = this.board[x][y];
      cell.addConstraints(this.lineConstraints(y));
      cell.addConstraints(this.columnConstraints(x));
      cell.addConstraints(this.boxConstraints(x, y));
    }
  }, {
    key: "ac3",
    value: function ac3() {}
  }, {
    key: "lcv",
    value: function lcv() {}
  }, {
    key: "mrv",
    value: function mrv() {}
  }, {
    key: "lineConstraints",
    value: function lineConstraints(row) {
      var constraints = new Set();

      for (var col = 0; col < SIZE; col++) {
        var cell = this.board[col][row];

        if (cell.value !== undefined) {
          constraints.add(cell.value);
        }
      }

      return constraints;
    }
  }, {
    key: "columnConstraints",
    value: function columnConstraints(col) {
      var constraints = new Set();

      for (var row = 0; row < SIZE; row++) {
        var cell = this.board[col][row];

        if (cell.value !== undefined) {
          constraints.add(cell.value);
        }
      }

      return constraints;
    }
  }, {
    key: "boxConstraints",
    value: function boxConstraints(col, row) {
      var constraints = new Set();
      var cornerX = col - col % BOX_SIZE;
      var cornerY = row - row % BOX_SIZE;

      for (var _col = cornerX; _col < cornerX + BOX_SIZE; _col++) {
        for (var _row = cornerY; _row < cornerY + BOX_SIZE; _row++) {
          var cell = this.board[col][row];

          if (cell.value !== undefined) {
            constraints.add(cell.value);
          }
        }
      }

      return constraints;
    }
  }, {
    key: "process",
    value: function process() {
      // TODO: To remove
      var cells = this.board; // for now we display the same cells to see if it works.

      var isResolved = true;
      return [isResolved, cells];
    }
  }]);

  return SudokuSolver;
}();

var Cell = /*#__PURE__*/function () {
  function Cell(value) {
    _classCallCheck(this, Cell);

    this.possible_values = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    this.value = value;
  }

  _createClass(Cell, [{
    key: "addConstraints",
    value: function addConstraints(values) {
      this.removeAll(this.possible_values, values);
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.value === undefined;
    }
  }, {
    key: "removeAll",
    value: function removeAll(originalSet, toBeRemovedSet) {
      _toConsumableArray(toBeRemovedSet).forEach(function (v) {
        originalSet["delete"](v);
      });
    }
  }]);

  return Cell;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlN1ZG9rdVNvbHZlci5qcyJdLCJuYW1lcyI6WyJCT1hfU0laRSIsIlNJWkUiLCJTdWRva3UiLCJjZWxscyIsInJvb3RJbnB1dCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImlucHV0cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiaW5wdXQiLCJ4IiwiZ2V0QXR0cmlidXRlIiwidW5kZWZpbmVkIiwieSIsInZhbHVlIiwiY2VsbCIsIkNlbGwiLCJwYXJzZUludCIsImRpc2FibGVkIiwiZ2V0Qm9hcmRGcm9tSHRtbCIsIiRyZXN1bHRUaXRsZSIsInN1ZG9rdVNvbHZlciIsIlN1ZG9rdVNvbHZlciIsInByb2Nlc3MiLCJpc1Jlc29sdmVkIiwicmVzb2x2ZWRDZWxscyIsImlubmVySFRNTCIsImNsYXNzTGlzdCIsImFkZCIsImRpc3BsYXlCb2FyZCIsImJvYXJkIiwidXBkYXRlQ29uc3RyYWludHMiLCJhZGRDb25zdHJhaW50cyIsImxpbmVDb25zdHJhaW50cyIsImNvbHVtbkNvbnN0cmFpbnRzIiwiYm94Q29uc3RyYWludHMiLCJyb3ciLCJjb25zdHJhaW50cyIsIlNldCIsImNvbCIsImNvcm5lclgiLCJjb3JuZXJZIiwiX2NvbCIsIl9yb3ciLCJwb3NzaWJsZV92YWx1ZXMiLCJ2YWx1ZXMiLCJyZW1vdmVBbGwiLCJvcmlnaW5hbFNldCIsInRvQmVSZW1vdmVkU2V0IiwidiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsUUFBUSxHQUFHLENBQWpCO0FBQ0EsSUFBTUMsSUFBSSxHQUFHRCxRQUFRLEdBQUdBLFFBQXhCOztJQUNNRSxNOzs7Ozs7O3VDQUN3QjtBQUN0QixVQUFJQyxLQUFLLEdBQUcsRUFBWjtBQUNBLFVBQU1DLFNBQVMsR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLGNBQXZCLENBQWxCO0FBQ0EsVUFBTUMsTUFBTSxHQUFHSCxTQUFTLENBQUNJLGdCQUFWLENBQTJCLGtCQUEzQixD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Q2MsSTtBQUNGLGdCQUFZRixLQUFaLEVBQW1CO0FBQUE7O0FBQ2YsU0FBSzhCLGVBQUwsR0FBdUIsSUFBSU4sR0FBSixDQUFRLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsQ0FBUixDQUF2QjtBQUNBLFNBQUt4QixLQUFMLEdBQWFBLEtBQWI7QUFDSDs7OzttQ0FDYytCLE0sRUFBUTtBQUNuQixXQUFLQyxTQUFMLENBQWUsS0FBS0YsZUFBcEIsRUFBcUNDLE1BQXJDO0FBQ0g7Ozs4QkFDUztBQUNOLGFBQU8sS0FBSy9CLEtBQUwsS0FBZUYsU0FBdEI7QUFDSDs7OzhCQUNTbUMsVyxFQUFhQyxjLEVBQWdCO0FBQ25DLHlCQUFJQSxjQUFKLEVBQW9CeEMsT0FBcEIsQ0FBNEIsVUFBVXlDLENBQVYsRUFBYTtBQUNyQ0YsUUFBQUEsV0FBVyxVQUFYLENBQW1CRSxDQUFuQjtBQUNILE9BRkQ7QUFHSCIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEJPWF9TSVpFID0gMztcbmNvbnN0IFNJWkUgPSBCT1hfU0laRSAqIEJPWF9TSVpFO1xuY2xhc3MgU3Vkb2t1IHtcbiAgICBzdGF0aWMgZ2V0Qm9hcmRGcm9tSHRtbCgpIHtcbiAgICAgICAgbGV0IGNlbGxzID0gW107XG4gICAgICAgIGNvbnN0IHJvb3RJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3Vkb2t1SW5wdXRcIik7XG4gICAgICAgIGNvbnN0IGlucHV0cyA9IHJvb3RJbnB1dC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbdHlwZT10ZXh0XVwiKTtcbiAgICAgICAgaW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB4ID0gaW5wdXQuZ2V0QXR0cmlidXRlKFwiZGF0YS14XCIpO1xuICAgICAgICAgICAgaWYgKGNlbGxzW3hdID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgY2VsbHNbeF0gPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXlcIik7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGlucHV0LnZhbHVlO1xuICAgICAgICAgICAgbGV0IGNlbGwgPSBuZXcgQ2VsbCh2YWx1ZSA9PT0gXCJcIiA/IDAgOiBwYXJzZUludCh2YWx1ZSkpO1xuICAgICAgICAgICAgY2VsbHNbeF1beV0gPSBjZWxsO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNlbGxzO1xuICAgIH1cbiAgICBzdGF0aWMgZGlzcGxheUJvYXJkKGNlbGxzKSB7XG4gICAgICAgIGNvbnN0IHJvb3RJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3Vkb2t1U29sdXRpb25cIik7XG4gICAgICAgIGNvbnN0IGlucHV0cyA9IHJvb3RJbnB1dC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbdHlwZT10ZXh0XVwiKTtcbiAgICAgICAgaW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB4ID0gaW5wdXQuZ2V0QXR0cmlidXRlKFwiZGF0YS14XCIpO1xuICAgICAgICAgICAgaWYgKGNlbGxzW3hdID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgY2VsbHNbeF0gPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXlcIik7XG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IGNlbGxzW3hdW3ldLnZhbHVlICE9PSAwID8gY2VsbHNbeF1beV0udmFsdWUgOiBcIlwiO1xuICAgICAgICAgICAgaW5wdXQuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIHJlc29sdmUoKSB7XG4gICAgICAgIGxldCBjZWxscyA9IFN1ZG9rdS5nZXRCb2FyZEZyb21IdG1sKCk7XG4gICAgICAgIGxldCAkcmVzdWx0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc3VsdC10aXRsZVwiKTtcbiAgICAgICAgdGhpcy5zdWRva3VTb2x2ZXIgPSBuZXcgU3Vkb2t1U29sdmVyKGNlbGxzKTtcbiAgICAgICAgY29uc3QgW2lzUmVzb2x2ZWQsIHJlc29sdmVkQ2VsbHNdID0gdGhpcy5zdWRva3VTb2x2ZXIucHJvY2VzcygpO1xuICAgICAgICBpZiAoIWlzUmVzb2x2ZWQpIHtcbiAgICAgICAgICAgICRyZXN1bHRUaXRsZS5pbm5lckhUTUwgPSBcIk5vbiByw6lzb2x1XCI7XG4gICAgICAgICAgICAkcmVzdWx0VGl0bGUuY2xhc3NMaXN0LmFkZChcIm5vdCByZXNvbHZlZFwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAkcmVzdWx0VGl0bGUuaW5uZXJIVE1MID0gXCJSw6lzb2x1XCI7XG4gICAgICAgICRyZXN1bHRUaXRsZS5jbGFzc0xpc3QuYWRkKFwicmVzb2x2ZWRcIik7XG4gICAgICAgIFN1ZG9rdS5kaXNwbGF5Qm9hcmQocmVzb2x2ZWRDZWxscyk7XG4gICAgICAgIC8vIE9uIGFmZmljaGUgbGUgc3Vkb2t1IHN1ciBsYSBwYXJ0aWUgZHJvaXRlIGRlIGwnw6ljcmFuLlxuICAgIH1cbn1cbmNsYXNzIFN1ZG9rdVNvbHZlciB7XG4gICAgY29uc3RydWN0b3IoYm9hcmQpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IGJvYXJkO1xuICAgICAgICAvLyBPbiBpbml0aWFsaXNlIGxlcyBjb250cmFpbnRlcyBpbml0aWFsZXMuXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgU0laRTsgeCsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IFNJWkU7IHkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ29uc3RyYWludHMoeCwgeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQWpvdXRlIGRlcyBjb250cmFpbnRlcyDDoCBsYSBjZWxsdWxlICh4OyB5KS5cbiAgICAgKiBDb3JyZXNwb25kIMOgIGVubGV2ZXIgbGVzIHZhbGV1cnMgcG9zc2libGVzIHF1aSBvbnQgZMOpasOgIMOpdMOpIGF0dHJpYnXDqSBzdXIgbGEgbGlnbmUgLyBsYSBjb2xvbm5lIC8gbGUgY2FycsOpLlxuICAgICAqIEBwYXJhbSB4XG4gICAgICogQHBhcmFtIHlcbiAgICAgKi9cbiAgICB1cGRhdGVDb25zdHJhaW50cyh4LCB5KSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmJvYXJkW3hdW3ldO1xuICAgICAgICBjZWxsLmFkZENvbnN0cmFpbnRzKHRoaXMubGluZUNvbnN0cmFpbnRzKHkpKTtcbiAgICAgICAgY2VsbC5hZGRDb25zdHJhaW50cyh0aGlzLmNvbHVtbkNvbnN0cmFpbnRzKHgpKTtcbiAgICAgICAgY2VsbC5hZGRDb25zdHJhaW50cyh0aGlzLmJveENvbnN0cmFpbnRzKHgsIHkpKTtcbiAgICB9XG4gICAgYWMzKCkgeyB9XG4gICAgbGN2KCkgeyB9XG4gICAgbXJ2KCkgeyB9XG4gICAgbGluZUNvbnN0cmFpbnRzKHJvdykge1xuICAgICAgICBsZXQgY29uc3RyYWludHMgPSBuZXcgU2V0KCk7XG4gICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IFNJWkU7IGNvbCsrKSB7XG4gICAgICAgICAgICBsZXQgY2VsbCA9IHRoaXMuYm9hcmRbY29sXVtyb3ddO1xuICAgICAgICAgICAgaWYgKGNlbGwudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0cmFpbnRzLmFkZChjZWxsLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29uc3RyYWludHM7XG4gICAgfVxuICAgIGNvbHVtbkNvbnN0cmFpbnRzKGNvbCkge1xuICAgICAgICBsZXQgY29uc3RyYWludHMgPSBuZXcgU2V0KCk7XG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IFNJWkU7IHJvdysrKSB7XG4gICAgICAgICAgICBsZXQgY2VsbCA9IHRoaXMuYm9hcmRbY29sXVtyb3ddO1xuICAgICAgICAgICAgaWYgKGNlbGwudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0cmFpbnRzLmFkZChjZWxsLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29uc3RyYWludHM7XG4gICAgfVxuICAgIGJveENvbnN0cmFpbnRzKGNvbCwgcm93KSB7XG4gICAgICAgIGxldCBjb25zdHJhaW50cyA9IG5ldyBTZXQoKTtcbiAgICAgICAgbGV0IGNvcm5lclggPSBjb2wgLSAoY29sICUgQk9YX1NJWkUpO1xuICAgICAgICBsZXQgY29ybmVyWSA9IHJvdyAtIChyb3cgJSBCT1hfU0laRSk7XG4gICAgICAgIGZvciAobGV0IF9jb2wgPSBjb3JuZXJYOyBfY29sIDwgY29ybmVyWCArIEJPWF9TSVpFOyBfY29sKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IF9yb3cgPSBjb3JuZXJZOyBfcm93IDwgY29ybmVyWSArIEJPWF9TSVpFOyBfcm93KyspIHtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbCA9IHRoaXMuYm9hcmRbY29sXVtyb3ddO1xuICAgICAgICAgICAgICAgIGlmIChjZWxsLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3RyYWludHMuYWRkKGNlbGwudmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29uc3RyYWludHM7XG4gICAgfVxuICAgIHByb2Nlc3MoKSB7XG4gICAgICAgIC8vIFRPRE86IFRvIHJlbW92ZVxuICAgICAgICBjb25zdCBjZWxscyA9IHRoaXMuYm9hcmQ7IC8vIGZvciBub3cgd2UgZGlzcGxheSB0aGUgc2FtZSBjZWxscyB0byBzZWUgaWYgaXQgd29ya3MuXG4gICAgICAgIGNvbnN0IGlzUmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gW2lzUmVzb2x2ZWQsIGNlbGxzXTtcbiAgICB9XG59XG5jbGFzcyBDZWxsIHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgICAgICB0aGlzLnBvc3NpYmxlX3ZhbHVlcyA9IG5ldyBTZXQoWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDhdKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICBhZGRDb25zdHJhaW50cyh2YWx1ZXMpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBbGwodGhpcy5wb3NzaWJsZV92YWx1ZXMsIHZhbHVlcyk7XG4gICAgfVxuICAgIGlzRW1wdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlID09PSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJlbW92ZUFsbChvcmlnaW5hbFNldCwgdG9CZVJlbW92ZWRTZXQpIHtcbiAgICAgICAgWy4uLnRvQmVSZW1vdmVkU2V0XS5mb3JFYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICBvcmlnaW5hbFNldC5kZWxldGUodik7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==