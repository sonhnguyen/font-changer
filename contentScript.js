(function () {

  var elements = document.querySelectorAll('*');

  [].forEach.call(elements, function (e) {
    var value = 0;
    if (e.style.fontWeight)
      value = parseInt(e.style.fontWeight, 10);
    if (value < 400) {
      e.style.fontWeight = "400";
    }
    if (["sticky", "fixed"].includes(getComputedStyle(e).position)) {
      e.setAttribute('style', 'position:static !important');
    }
  });


  /* find the topbar by coordinate */
  var topbar
  var el = document.elementFromPoint(document.documentElement.clientWidth - 200, 20)
  while (el) {
    if (getComputedStyle(el).position == 'fixed') topbar = el
    el = el.parentNode;
    if (el == document.body) break
  }
  if (topbar == undefined) return

  /* disable position:fixed */
  // topbar.style.position = 'absolute'
  // ↑ this line doesn't work well, because sometime offsetParent is not <body>
  // ↓ workaround
  var paint = function (enforce) {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    var threshold = 200
    if (!enforce && scrollTop > threshold * 3) return
    var offset = scrollTop / threshold
    if (offset > 1.2) offset = 1.2
    topbar.style.transform = 'translateY(-' + offset * 100 + '%)'
  }
  paint(true) // initialize
  document.addEventListener('scroll', () => paint())

  /* when use JS to frequently change CSS value, disable CSS transition to avoid weird delay */
  // topbar.style.transition = 'transform 0s'
  // ↑ this line doesn't work because of compatibility
  // ↓ workaround
  topbar.classList.add('remove-topbar')
  var style = document.createElement('style')
  style.innerHTML = '.remove-topbar{transition:transform 0s !important}'
  document.head.appendChild(style)

})()

