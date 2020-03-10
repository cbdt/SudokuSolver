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
var COLUMNS = "123456789";
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
        cells.set(y + "" + x, value === "" ? 0 : parseInt(value));
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
        var y = input.getAttribute("data-y");
        input.value = cells.get(y + "" + x) !== 0 ? cells.get(y + "" + x).toString() : "";
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

    this.board = board;
    this.variables = this.cross(COLUMNS, ROWS);
    this.neighbors = new Map();
    this.possibilities = new Map();
    this.constraints = new Array();
    this.binary_constraints = new Array(); // GENERATION DES POSSIBILITES

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.board[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _slicedToArray(_step.value, 2),
            position = _step$value[0],
            value = _step$value[1];

        this.possibilities.set(position, value === 0 ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : [value]);
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

    for (var i = 0; i < ROWS.length; i++) {
      this.constraints.push(this.cross(ROWS[i], COLUMNS));
      this.constraints.push(this.cross(ROWS, COLUMNS[i]));
    }

    for (var _i2 = 0, _arr2 = ["ABC", "DEF", "GHI"]; _i2 < _arr2.length; _i2++) {
      var _bi = _arr2[_i2];

      for (var _i3 = 0, _arr3 = ["123", "456", "789"]; _i3 < _arr3.length; _i3++) {
        var _bj = _arr3[_i3];
        this.constraints.push(this.cross(_bi, _bj));
      }
    } // Transformation en contraintes binaires


    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = this.constraints[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _this$binary_constrai;

        var c = _step2.value;

        (_this$binary_constrai = this.binary_constraints).push.apply(_this$binary_constrai, _toConsumableArray(k_combinations(c, 2)));
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

    this.binary_constraints = _toConsumableArray(new Set(this.binary_constraints)); // Enlève les doublons.
    // GENERATION DES VOISINS

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = this.variables[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var v = _step3.value;
        this.neighbors.set(v, new Array());
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = this.binary_constraints[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _c = _step4.value;
            if (v === _c[0]) this.neighbors[v].push(_c[1]);
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

  _createClass(SudokuSolver, [{
    key: "process",
    value: function process() {
      // TODO: To remove
      var cells = this.board; // for now we display the same cells to see if it works.

      var isResolved = true;
      return [isResolved, cells];
    }
  }, {
    key: "cross",
    value: function cross(A, B) {
      var res = new Array();
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = A[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _a = _step5.value;
          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (var _iterator6 = B[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              var _b = _step6.value;
              res.push(_a + "" + _b);
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

      return res;
    }
  }]);

  return SudokuSolver;
}(); // UTILS
// https://gist.github.com/axelpale/3118596


var k_combinations = function k_combinations(set, k) {
  if (k > set.length || k <= 0) {
    return [];
  }

  if (k === set.length) {
    return [set];
  }

  if (k === 1) {
    return set.reduce(function (acc, cur) {
      return [].concat(_toConsumableArray(acc), [[cur]]);
    }, []);
  }

  var combs = [];
  var tail_combs = [];

  for (var i = 0; i <= set.length - k + 1; i++) {
    tail_combs = k_combinations(set.slice(i + 1), k - 1);

    for (var j = 0; j < tail_combs.length; j++) {
      combs.push([set[i]].concat(_toConsumableArray(tail_combs[j])));
    }
  }

  return combs;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlN1ZG9rdVNvbHZlci5qcyJdLCJuYW1lcyI6WyJCT1hfU0laRSIsIlNJWkUiLCJDT0xVTU5TIiwiUk9XUyIsIlN1ZG9rdSIsImNlbGxzIiwiTWFwIiwicm9vdElucHV0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaW5wdXRzIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJpbnB1dCIsIngiLCJnZXRBdHRyaWJ1dGUiLCJ1bmRlZmluZWQiLCJ5IiwidmFsdWUiLCJzZXQiLCJwYXJzZUludCIsImdldCIsInRvU3RyaW5nIiwiZGlzYWJsZWQiLCJnZXRCb2FyZEZyb21IdG1sIiwiJHJlc3VsdFRpdGxlIiwic3Vkb2t1U29sdmVyIiwiU3Vkb2t1U29sdmVyIiwicHJvY2VzcyIsImlzUmVzb2x2ZWQiLCJyZXNvbHZlZENlbGxzIiwiaW5uZXJIVE1MIiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlzcGxheUJvYXJkIiwiYm9hcmQiLCJ2YXJpYWJsZXMiLCJjcm9zcyIsIm5laWdoYm9ycyIsInBvc3NpYmlsaXRpZXMiLCJjb25zdHJhaW50cyIsIkFycmF5IiwiYmluYXJ5X2NvbnN0cmFpbnRzIiwicG9zaXRpb24iLCJpIiwibGVuZ3RoIiwicHVzaCIsIl9iaSIsIl9iaiIsImMiLCJrX2NvbWJpbmF0aW9ucyIsIlNldCIsInYiLCJBIiwiQiIsInJlcyIsIl9hIiwiX2IiLCJrIiwicmVkdWNlIiwiYWNjIiwiY3VyIiwiY29tYnMiLCJ0YWlsX2NvbWJzIiwic2xpY2UiLCJqIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxRQUFRLEdBQUcsQ0FBakI7QUFDQSxJQUFNQyxJQUFJLEdBQUdELFFBQVEsR0FBR0EsUUFBeEI7QUFDQSxJQUFNRSxPQUFPLEdBQUcsV0FBaEI7QUFDQSxJQUFNQyxJQUFJLEdBQUcsV0FBYjs7SUFDTUMsTTs7Ozs7Ozt1Q0FDd0I7QUFDdEIsVUFBSUMsS0FBSyxHQUFHLElBQUlDLEdBQUosRUFB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LFVBQUNDLEdBQUQsRUFBTUMsR0FBTjtBQUFBLDBDQUFrQkQsR0FBbEIsSUFBdUIsQ0FBQ0MsR0FBRCxDQUF2QjtBQUFBLEtBQVgsRUFBMEMsRUFBMUMsQ0FBUDtBQUNIOztBQUNELE1BQU1DLEtBQUssR0FBRyxFQUFkO0FBQ0EsTUFBSUMsVUFBVSxHQUFHLEVBQWpCOztBQUNBLE9BQUssSUFBSW5CLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLElBQUl6QixHQUFHLENBQUMwQixNQUFKLEdBQWFhLENBQWIsR0FBaUIsQ0FBdEMsRUFBeUNkLENBQUMsRUFBMUMsRUFBOEM7QUFDMUNtQixJQUFBQSxVQUFVLEdBQUdiLGNBQWMsQ0FBQy9CLEdBQUcsQ0FBQzZDLEtBQUosQ0FBVXBCLENBQUMsR0FBRyxDQUFkLENBQUQsRUFBbUJjLENBQUMsR0FBRyxDQUF2QixDQUEzQjs7QUFDQSxTQUFLLElBQUlPLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdGLFVBQVUsQ0FBQ2xCLE1BQS9CLEVBQXVDb0IsQ0FBQyxFQUF4QyxFQUE0QztBQUN4Q0gsTUFBQUEsS0FBSyxDQUFDaEIsSUFBTixFQUFZM0IsR0FBRyxDQUFDeUIsQ0FBRCxDQUFmLDRCQUF1Qm1CLFVBQVUsQ0FBQ0UsQ0FBRCxDQUFqQztBQUNIO0FBQ0o7O0FBQ0QsU0FBT0gsS0FBUDtBQUNILENBbkJEIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQk9YX1NJWkUgPSAzO1xuY29uc3QgU0laRSA9IEJPWF9TSVpFICogQk9YX1NJWkU7XG5jb25zdCBDT0xVTU5TID0gXCIxMjM0NTY3ODlcIjtcbmNvbnN0IFJPV1MgPSBcIkFCQ0RFRkdISVwiO1xuY2xhc3MgU3Vkb2t1IHtcbiAgICBzdGF0aWMgZ2V0Qm9hcmRGcm9tSHRtbCgpIHtcbiAgICAgICAgbGV0IGNlbGxzID0gbmV3IE1hcCgpO1xuICAgICAgICBjb25zdCByb290SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N1ZG9rdUlucHV0XCIpO1xuICAgICAgICBjb25zdCBpbnB1dHMgPSByb290SW5wdXQucXVlcnlTZWxlY3RvckFsbChcImlucHV0W3R5cGU9dGV4dF1cIik7XG4gICAgICAgIGlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeCA9IGlucHV0LmdldEF0dHJpYnV0ZShcImRhdGEteFwiKTtcbiAgICAgICAgICAgIGlmIChjZWxsc1t4XSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIGNlbGxzW3hdID0gW107XG4gICAgICAgICAgICBjb25zdCB5ID0gaW5wdXQuZ2V0QXR0cmlidXRlKFwiZGF0YS15XCIpO1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBpbnB1dC52YWx1ZTtcbiAgICAgICAgICAgIGNlbGxzLnNldCh5ICsgXCJcIiArIHgsIHZhbHVlID09PSBcIlwiID8gMCA6IHBhcnNlSW50KHZhbHVlKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY2VsbHM7XG4gICAgfVxuICAgIHN0YXRpYyBkaXNwbGF5Qm9hcmQoY2VsbHMpIHtcbiAgICAgICAgY29uc3Qgcm9vdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdWRva3VTb2x1dGlvblwiKTtcbiAgICAgICAgY29uc3QgaW5wdXRzID0gcm9vdElucHV0LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFt0eXBlPXRleHRdXCIpO1xuICAgICAgICBpbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHggPSBpbnB1dC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXhcIik7XG4gICAgICAgICAgICBjb25zdCB5ID0gaW5wdXQuZ2V0QXR0cmlidXRlKFwiZGF0YS15XCIpO1xuICAgICAgICAgICAgaW5wdXQudmFsdWUgPVxuICAgICAgICAgICAgICAgIGNlbGxzLmdldCh5ICsgXCJcIiArIHgpICE9PSAwID8gY2VsbHMuZ2V0KHkgKyBcIlwiICsgeCkudG9TdHJpbmcoKSA6IFwiXCI7XG4gICAgICAgICAgICBpbnB1dC5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGF0aWMgcmVzb2x2ZSgpIHtcbiAgICAgICAgbGV0IGNlbGxzID0gU3Vkb2t1LmdldEJvYXJkRnJvbUh0bWwoKTtcbiAgICAgICAgbGV0ICRyZXN1bHRUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzdWx0LXRpdGxlXCIpO1xuICAgICAgICB0aGlzLnN1ZG9rdVNvbHZlciA9IG5ldyBTdWRva3VTb2x2ZXIoY2VsbHMpO1xuICAgICAgICBjb25zdCBbaXNSZXNvbHZlZCwgcmVzb2x2ZWRDZWxsc10gPSB0aGlzLnN1ZG9rdVNvbHZlci5wcm9jZXNzKCk7XG4gICAgICAgIGlmICghaXNSZXNvbHZlZCkge1xuICAgICAgICAgICAgJHJlc3VsdFRpdGxlLmlubmVySFRNTCA9IFwiTm9uIHLDqXNvbHVcIjtcbiAgICAgICAgICAgICRyZXN1bHRUaXRsZS5jbGFzc0xpc3QuYWRkKFwibm90IHJlc29sdmVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgICRyZXN1bHRUaXRsZS5pbm5lckhUTUwgPSBcIlLDqXNvbHVcIjtcbiAgICAgICAgJHJlc3VsdFRpdGxlLmNsYXNzTGlzdC5hZGQoXCJyZXNvbHZlZFwiKTtcbiAgICAgICAgU3Vkb2t1LmRpc3BsYXlCb2FyZChyZXNvbHZlZENlbGxzKTtcbiAgICAgICAgLy8gT24gYWZmaWNoZSBsZSBzdWRva3Ugc3VyIGxhIHBhcnRpZSBkcm9pdGUgZGUgbCfDqWNyYW4uXG4gICAgfVxufVxuY2xhc3MgU3Vkb2t1U29sdmVyIHtcbiAgICBjb25zdHJ1Y3Rvcihib2FyZCkge1xuICAgICAgICB0aGlzLmJvYXJkID0gYm9hcmQ7XG4gICAgICAgIHRoaXMudmFyaWFibGVzID0gdGhpcy5jcm9zcyhDT0xVTU5TLCBST1dTKTtcbiAgICAgICAgdGhpcy5uZWlnaGJvcnMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMucG9zc2liaWxpdGllcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5jb25zdHJhaW50cyA9IG5ldyBBcnJheSgpO1xuICAgICAgICB0aGlzLmJpbmFyeV9jb25zdHJhaW50cyA9IG5ldyBBcnJheSgpO1xuICAgICAgICAvLyBHRU5FUkFUSU9OIERFUyBQT1NTSUJJTElURVNcbiAgICAgICAgZm9yIChjb25zdCBbcG9zaXRpb24sIHZhbHVlXSBvZiB0aGlzLmJvYXJkKSB7XG4gICAgICAgICAgICB0aGlzLnBvc3NpYmlsaXRpZXMuc2V0KHBvc2l0aW9uLCB2YWx1ZSA9PT0gMCA/IFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5XSA6IFt2YWx1ZV0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIEdFTkVSQVRJT04gREVTIENPTlRSQUlOVEVTXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgUk9XUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5jb25zdHJhaW50cy5wdXNoKHRoaXMuY3Jvc3MoUk9XU1tpXSwgQ09MVU1OUykpO1xuICAgICAgICAgICAgdGhpcy5jb25zdHJhaW50cy5wdXNoKHRoaXMuY3Jvc3MoUk9XUywgQ09MVU1OU1tpXSkpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgX2JpIG9mIFtcIkFCQ1wiLCBcIkRFRlwiLCBcIkdISVwiXSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBfYmogb2YgW1wiMTIzXCIsIFwiNDU2XCIsIFwiNzg5XCJdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25zdHJhaW50cy5wdXNoKHRoaXMuY3Jvc3MoX2JpLCBfYmopKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBUcmFuc2Zvcm1hdGlvbiBlbiBjb250cmFpbnRlcyBiaW5haXJlc1xuICAgICAgICBmb3IgKGNvbnN0IGMgb2YgdGhpcy5jb25zdHJhaW50cykge1xuICAgICAgICAgICAgdGhpcy5iaW5hcnlfY29uc3RyYWludHMucHVzaCguLi5rX2NvbWJpbmF0aW9ucyhjLCAyKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5iaW5hcnlfY29uc3RyYWludHMgPSBbLi4ubmV3IFNldCh0aGlzLmJpbmFyeV9jb25zdHJhaW50cyldOyAvLyBFbmzDqHZlIGxlcyBkb3VibG9ucy5cbiAgICAgICAgLy8gR0VORVJBVElPTiBERVMgVk9JU0lOU1xuICAgICAgICBmb3IgKGNvbnN0IHYgb2YgdGhpcy52YXJpYWJsZXMpIHtcbiAgICAgICAgICAgIHRoaXMubmVpZ2hib3JzLnNldCh2LCBuZXcgQXJyYXkoKSk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGMgb2YgdGhpcy5iaW5hcnlfY29uc3RyYWludHMpIHtcbiAgICAgICAgICAgICAgICBpZiAodiA9PT0gY1swXSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWlnaGJvcnNbdl0ucHVzaChjWzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwcm9jZXNzKCkge1xuICAgICAgICAvLyBUT0RPOiBUbyByZW1vdmVcbiAgICAgICAgY29uc3QgY2VsbHMgPSB0aGlzLmJvYXJkOyAvLyBmb3Igbm93IHdlIGRpc3BsYXkgdGhlIHNhbWUgY2VsbHMgdG8gc2VlIGlmIGl0IHdvcmtzLlxuICAgICAgICBjb25zdCBpc1Jlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIFtpc1Jlc29sdmVkLCBjZWxsc107XG4gICAgfVxuICAgIGNyb3NzKEEsIEIpIHtcbiAgICAgICAgbGV0IHJlcyA9IG5ldyBBcnJheSgpO1xuICAgICAgICBmb3IgKGxldCBfYSBvZiBBKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBfYiBvZiBCKSB7XG4gICAgICAgICAgICAgICAgcmVzLnB1c2goX2EgKyBcIlwiICsgX2IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxufVxuLy8gVVRJTFNcbi8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2F4ZWxwYWxlLzMxMTg1OTZcbmNvbnN0IGtfY29tYmluYXRpb25zID0gKHNldCwgaykgPT4ge1xuICAgIGlmIChrID4gc2V0Lmxlbmd0aCB8fCBrIDw9IDApIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBpZiAoayA9PT0gc2V0Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gW3NldF07XG4gICAgfVxuICAgIGlmIChrID09PSAxKSB7XG4gICAgICAgIHJldHVybiBzZXQucmVkdWNlKChhY2MsIGN1cikgPT4gWy4uLmFjYywgW2N1cl1dLCBbXSk7XG4gICAgfVxuICAgIGNvbnN0IGNvbWJzID0gW107XG4gICAgbGV0IHRhaWxfY29tYnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBzZXQubGVuZ3RoIC0gayArIDE7IGkrKykge1xuICAgICAgICB0YWlsX2NvbWJzID0ga19jb21iaW5hdGlvbnMoc2V0LnNsaWNlKGkgKyAxKSwgayAtIDEpO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRhaWxfY29tYnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGNvbWJzLnB1c2goW3NldFtpXSwgLi4udGFpbF9jb21ic1tqXV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb21icztcbn07XG4iXX0=