/* --- Reveal on scroll --- */
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  function check() {
    var trigger = window.innerHeight * 0.88;
    els.forEach(function (el) {
      if (el.getBoundingClientRect().top < trigger) {
        el.classList.add('revealed');
      }
    });
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function () {
        check();
        ticking = false;
      });
    }
  });
  window.addEventListener('resize', function () { check(); });
  check();
})();

/* --- Walking carabid beetles --- */
(function () {
  var container = document.querySelector('.carabids');
  if (!container) return;

  // SVG beetle — simple top-down carabid silhouette
  var beetleSVG = '<svg width="28" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">'
    + '<path d="M10 10 Q8 4 4 1" stroke="currentColor" stroke-width="1" stroke-linecap="round" fill="none"/>'
    + '<path d="M18 10 Q20 4 24 1" stroke="currentColor" stroke-width="1" stroke-linecap="round" fill="none"/>'
    + '<ellipse cx="14" cy="12" rx="4.5" ry="4" fill="currentColor"/>'
    + '<ellipse cx="14" cy="18" rx="5.5" ry="3.5" fill="currentColor"/>'
    + '<ellipse cx="14" cy="28" rx="7" ry="10" fill="currentColor"/>'
    + '<line x1="14" y1="19" x2="14" y2="37" stroke="#080b0f" stroke-width="0.8"/>'
    + '<path d="M9 16 Q3 14 1 11" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" fill="none"/>'
    + '<path d="M8.5 20 Q2 20 0 18" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" fill="none"/>'
    + '<path d="M9 25 Q3 27 1 30" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" fill="none"/>'
    + '<path d="M19 16 Q25 14 27 11" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" fill="none"/>'
    + '<path d="M19.5 20 Q26 20 28 18" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" fill="none"/>'
    + '<path d="M19 25 Q25 27 27 30" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" fill="none"/>'
    + '</svg>';

  var NUM_BEETLES = 5;
  var beetles = [];

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createBeetle() {
    var el = document.createElement('div');
    el.className = 'carabid-beetle';
    el.innerHTML = beetleSVG;
    el.style.color = 'hsl(' + Math.floor(rand(200, 230)) + ', 40%, ' + Math.floor(rand(35, 55)) + '%)';
    container.appendChild(el);

    var scale = rand(0.6, 1.2);
    var x = rand(0, window.innerWidth - 28);
    var y = rand(0, window.innerHeight - 40);
    var angle = rand(0, 360);
    var speed = rand(0.3, 0.8);
    var turnBase = rand(80, 240);

    return { el: el, x: x, y: y, angle: angle, speed: speed, scale: scale, turnBase: turnBase, turnCd: turnBase };
  }

  for (var i = 0; i < NUM_BEETLES; i++) {
    beetles.push(createBeetle());
  }

  function step() {
    beetles.forEach(function (b) {
      b.turnCd--;
      if (b.turnCd <= 0) {
        b.angle += rand(-60, 60);
        b.turnCd = b.turnBase + rand(-40, 40);
      }

      var rad = b.angle * Math.PI / 180;
      b.x += Math.sin(rad) * b.speed;
      b.y -= Math.cos(rad) * b.speed;

      // Wrap around screen edges
      var w = window.innerWidth;
      var h = window.innerHeight;
      if (b.x < -40) b.x = w + 20;
      if (b.x > w + 40) b.x = -20;
      if (b.y < -50) b.y = h + 20;
      if (b.y > h + 50) b.y = -20;

      b.el.style.transform = 'translate(' + b.x.toFixed(1) + 'px,' + b.y.toFixed(1) + 'px) rotate(' + b.angle.toFixed(1) + 'deg) scale(' + b.scale + ')';
    });

    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
})();
