"use strict";

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

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
    key: "resolve",
    value: function resolve() {
      var cells = Sudoku.getBoardFromHtml();
      this.sudokuSolver = new SudokuSolver(cells);

      var _this$sudokuSolver$pr = this.sudokuSolver.process(),
          _this$sudokuSolver$pr2 = _slicedToArray(_this$sudokuSolver$pr, 2),
          isResolved = _this$sudokuSolver$pr2[0],
          resolvedCells = _this$sudokuSolver$pr2[1];

      if (!isResolved) {
        alert("Non résolvable.");
        return;
      } // On affiche le sudoku sur la partie droite de l'écran.

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
   * Correspond à enlever les valeurs possibles qui ont déjà été attribué sur la ligne / colonne / carré.
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
      var cells = [];
      var isResolved = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlN1ZG9rdVNvbHZlci5qcyJdLCJuYW1lcyI6WyJCT1hfU0laRSIsIlNJWkUiLCJjZWxscyIsInJvb3RJbnB1dCIsImRvY3VtZW50IiwiaW5wdXRzIiwiaW5wdXQiLCJ4IiwieSIsInZhbHVlIiwiY2VsbCIsInBhcnNlSW50IiwiU3Vkb2t1IiwiYWxlcnQiLCJjb25zdHJ1Y3RvciIsImNvbnN0cmFpbnRzIiwiY29sIiwicm93IiwiY29ybmVyWCIsImNvcm5lclkiLCJfY29sIiwiX3JvdyIsImlzUmVzb2x2ZWQiLCJvcmlnaW5hbFNldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLFFBQVEsR0FBZCxDQUFBO0FBQ0EsSUFBTUMsSUFBSSxHQUFHRCxRQUFRLEdBQXJCLFFBQUE7O0lBQ0EsTTs7Ozs7Ozt1Q0FDOEI7QUFDdEIsVUFBSUUsS0FBSyxHQUFULEVBQUE7QUFDQSxVQUFNQyxTQUFTLEdBQUdDLFFBQVEsQ0FBUkEsYUFBQUEsQ0FBbEIsY0FBa0JBLENBQWxCO0FBQ0EsVUFBTUMsTUFBTSxHQUFHRixTQUFTLENBQVRBLGdCQUFBQSxDQUFmLGtCQUFlQSxDQUFmO0FBQ0FFLE1BQUFBLE1BQU0sQ0FBTkEsT0FBQUEsQ0FBZ0JDLFVBQUQsS0FBQ0EsRUFBVTtBQUN0QixZQUFNQyxDQUFDLEdBQUdELEtBQUssQ0FBTEEsWUFBQUEsQ0FBVixRQUFVQSxDQUFWO0FBQ0EsWUFBSUosS0FBSyxDQUFMQSxDQUFLLENBQUxBLEtBQUosU0FBQSxFQUNJQSxLQUFLLENBQUxBLENBQUssQ0FBTEEsR0FBQUEsRUFBQUE7QUFDSixZQUFNTSxDQUFDLEdBQUdGLEtBQUssQ0FBTEEsWUFBQUEsQ0FBVixRQUFVQSxDQUFWO0FBQ0EsWUFBTUcsS0FBSyxHQUFHSCxLQUFLLENBQW5CLEtBQUE7QUFDQSxZQUFJSSxJQUFJLEdB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RUFBQSxDQUFBLEVBQS9CLENBQStCLENBQVIsQ0FBdkI7QUFDQSxTQUFBLEtBQUEsR0FBQSxLQUFBO0FBQ0g7Ozs7bUNBQ2EsTSxFQUFTO0FBQ25CLFdBQUEsU0FBQSxDQUFlLEtBQWYsZUFBQSxFQUFBLE1BQUE7QUFDSDs7OzhCQUNTO0FBQ04sYUFBTyxLQUFBLEtBQUEsS0FBUCxTQUFBO0FBQ0g7Ozs4QkFDUSxXLEVBQUEsYyxFQUE4QjtBQUNuQyxNQUFBLGtCQUFBLENBQUEsY0FBQSxDQUFBLENBQUEsT0FBQSxDQUE0QixVQUFBLENBQUEsRUFBYTtBQUNyQ1MsUUFBQUEsV0FBQUEsQ0FBQUEsUUFBQUEsQ0FBQUEsQ0FBQUEsQ0FBQUE7QUFESixPQUFBO0FBR0giLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBCT1hfU0laRSA9IDM7XG5jb25zdCBTSVpFID0gQk9YX1NJWkUgKiBCT1hfU0laRTtcbmNsYXNzIFN1ZG9rdSB7XG4gICAgc3RhdGljIGdldEJvYXJkRnJvbUh0bWwoKSB7XG4gICAgICAgIGxldCBjZWxscyA9IFtdO1xuICAgICAgICBjb25zdCByb290SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N1ZG9rdUlucHV0XCIpO1xuICAgICAgICBjb25zdCBpbnB1dHMgPSByb290SW5wdXQucXVlcnlTZWxlY3RvckFsbChcImlucHV0W3R5cGU9dGV4dF1cIik7XG4gICAgICAgIGlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeCA9IGlucHV0LmdldEF0dHJpYnV0ZShcImRhdGEteFwiKTtcbiAgICAgICAgICAgIGlmIChjZWxsc1t4XSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIGNlbGxzW3hdID0gW107XG4gICAgICAgICAgICBjb25zdCB5ID0gaW5wdXQuZ2V0QXR0cmlidXRlKFwiZGF0YS15XCIpO1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBpbnB1dC52YWx1ZTtcbiAgICAgICAgICAgIGxldCBjZWxsID0gbmV3IENlbGwodmFsdWUgPT09IFwiXCIgPyAwIDogcGFyc2VJbnQodmFsdWUpKTtcbiAgICAgICAgICAgIGNlbGxzW3hdW3ldID0gY2VsbDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjZWxscztcbiAgICB9XG4gICAgc3RhdGljIHJlc29sdmUoKSB7XG4gICAgICAgIGxldCBjZWxscyA9IFN1ZG9rdS5nZXRCb2FyZEZyb21IdG1sKCk7XG4gICAgICAgIHRoaXMuc3Vkb2t1U29sdmVyID0gbmV3IFN1ZG9rdVNvbHZlcihjZWxscyk7XG4gICAgICAgIGNvbnN0IFtpc1Jlc29sdmVkLCByZXNvbHZlZENlbGxzXSA9IHRoaXMuc3Vkb2t1U29sdmVyLnByb2Nlc3MoKTtcbiAgICAgICAgaWYgKCFpc1Jlc29sdmVkKSB7XG4gICAgICAgICAgICBhbGVydChcIk5vbiByw6lzb2x2YWJsZS5cIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gT24gYWZmaWNoZSBsZSBzdWRva3Ugc3VyIGxhIHBhcnRpZSBkcm9pdGUgZGUgbCfDqWNyYW4uXG4gICAgfVxufVxuY2xhc3MgU3Vkb2t1U29sdmVyIHtcbiAgICBjb25zdHJ1Y3Rvcihib2FyZCkge1xuICAgICAgICB0aGlzLmJvYXJkID0gYm9hcmQ7XG4gICAgICAgIC8vIE9uIGluaXRpYWxpc2UgbGVzIGNvbnRyYWludGVzIGluaXRpYWxlcy5cbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBTSVpFOyB4KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgU0laRTsgeSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDb25zdHJhaW50cyh4LCB5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBam91dGUgZGVzIGNvbnRyYWludGVzIMOgIGxhIGNlbGx1bGUgKHg7IHkpLlxuICAgICAqIENvcnJlc3BvbmQgw6AgZW5sZXZlciBsZXMgdmFsZXVycyBwb3NzaWJsZXMgcXVpIG9udCBkw6lqw6Agw6l0w6kgYXR0cmlidcOpIHN1ciBsYSBsaWduZSAvIGNvbG9ubmUgLyBjYXJyw6kuXG4gICAgICogQHBhcmFtIHhcbiAgICAgKiBAcGFyYW0geVxuICAgICAqL1xuICAgIHVwZGF0ZUNvbnN0cmFpbnRzKHgsIHkpIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuYm9hcmRbeF1beV07XG4gICAgICAgIGNlbGwuYWRkQ29uc3RyYWludHModGhpcy5saW5lQ29uc3RyYWludHMoeSkpO1xuICAgICAgICBjZWxsLmFkZENvbnN0cmFpbnRzKHRoaXMuY29sdW1uQ29uc3RyYWludHMoeCkpO1xuICAgICAgICBjZWxsLmFkZENvbnN0cmFpbnRzKHRoaXMuYm94Q29uc3RyYWludHMoeCwgeSkpO1xuICAgIH1cbiAgICBhYzMoKSB7IH1cbiAgICBsY3YoKSB7IH1cbiAgICBtcnYoKSB7IH1cbiAgICBsaW5lQ29uc3RyYWludHMocm93KSB7XG4gICAgICAgIGxldCBjb25zdHJhaW50cyA9IG5ldyBTZXQoKTtcbiAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgU0laRTsgY29sKyspIHtcbiAgICAgICAgICAgIGxldCBjZWxsID0gdGhpcy5ib2FyZFtjb2xdW3Jvd107XG4gICAgICAgICAgICBpZiAoY2VsbC52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3RyYWludHMuYWRkKGNlbGwudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb25zdHJhaW50cztcbiAgICB9XG4gICAgY29sdW1uQ29uc3RyYWludHMoY29sKSB7XG4gICAgICAgIGxldCBjb25zdHJhaW50cyA9IG5ldyBTZXQoKTtcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgU0laRTsgcm93KyspIHtcbiAgICAgICAgICAgIGxldCBjZWxsID0gdGhpcy5ib2FyZFtjb2xdW3Jvd107XG4gICAgICAgICAgICBpZiAoY2VsbC52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3RyYWludHMuYWRkKGNlbGwudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb25zdHJhaW50cztcbiAgICB9XG4gICAgYm94Q29uc3RyYWludHMoY29sLCByb3cpIHtcbiAgICAgICAgbGV0IGNvbnN0cmFpbnRzID0gbmV3IFNldCgpO1xuICAgICAgICBsZXQgY29ybmVyWCA9IGNvbCAtIChjb2wgJSBCT1hfU0laRSk7XG4gICAgICAgIGxldCBjb3JuZXJZID0gcm93IC0gKHJvdyAlIEJPWF9TSVpFKTtcbiAgICAgICAgZm9yIChsZXQgX2NvbCA9IGNvcm5lclg7IF9jb2wgPCBjb3JuZXJYICsgQk9YX1NJWkU7IF9jb2wrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgX3JvdyA9IGNvcm5lclk7IF9yb3cgPCBjb3JuZXJZICsgQk9YX1NJWkU7IF9yb3crKykge1xuICAgICAgICAgICAgICAgIGxldCBjZWxsID0gdGhpcy5ib2FyZFtjb2xdW3Jvd107XG4gICAgICAgICAgICAgICAgaWYgKGNlbGwudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdHJhaW50cy5hZGQoY2VsbC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb25zdHJhaW50cztcbiAgICB9XG4gICAgcHJvY2VzcygpIHtcbiAgICAgICAgY29uc3QgY2VsbHMgPSBbXTtcbiAgICAgICAgY29uc3QgaXNSZXNvbHZlZCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gW2lzUmVzb2x2ZWQsIGNlbGxzXTtcbiAgICB9XG59XG5jbGFzcyBDZWxsIHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgICAgICB0aGlzLnBvc3NpYmxlX3ZhbHVlcyA9IG5ldyBTZXQoWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDhdKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICBhZGRDb25zdHJhaW50cyh2YWx1ZXMpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBbGwodGhpcy5wb3NzaWJsZV92YWx1ZXMsIHZhbHVlcyk7XG4gICAgfVxuICAgIGlzRW1wdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlID09PSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJlbW92ZUFsbChvcmlnaW5hbFNldCwgdG9CZVJlbW92ZWRTZXQpIHtcbiAgICAgICAgWy4uLnRvQmVSZW1vdmVkU2V0XS5mb3JFYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICBvcmlnaW5hbFNldC5kZWxldGUodik7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==