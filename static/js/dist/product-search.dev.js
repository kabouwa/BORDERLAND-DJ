"use strict";

//Search by title
document.getElementById("search-form").addEventListener("submit", function _callee(sumbit) {
  var response, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          sumbit.preventDefault();
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch("/api/searchProducts/?search=".concat(search.value)));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context.sent;
          showPro(data["productsFounded"]);
          toggleUpdate();
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](1);
          console.error("Search Faild: ", _context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 12]]);
});