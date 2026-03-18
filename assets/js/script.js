(function () {
  "use strict";

  // Reveal elements on scroll
  var revealClass = "reveal";
  var revealedClass = "revealed";

  function reveal() {
    var elements = document.querySelectorAll("." + revealClass);
    var windowHeight = window.innerHeight;
    var revealTop = windowHeight * 0.85;

    elements.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < revealTop) {
        el.classList.add(revealedClass);
      }
    });
  }

  function throttle(fn, delay) {
    var last = 0;
    return function () {
      var now = Date.now();
      if (now - last >= delay) {
        last = now;
        fn();
      }
    };
  }

  // Initial reveal for elements in viewport
  reveal();

  window.addEventListener("scroll", throttle(reveal, 80));
  window.addEventListener("resize", throttle(reveal, 80));
})();
