/* PhysLab shared code: header, footer, ads, consent, canvas stage, helpers */
(function () {
  var C = window.PHYSLAB;
  var root = document.body.getAttribute("data-root") || "";
  var simId = document.body.getAttribute("data-sim");
  var page = document.body.getAttribute("data-page") || "";

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ---------- header / footer ---------- */
  var logoSvg = '<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="3.4" fill="#f0a202"/><ellipse cx="16" cy="16" rx="13" ry="5.5" fill="none" stroke="#0b7a75" stroke-width="2"/><ellipse cx="16" cy="16" rx="13" ry="5.5" fill="none" stroke="#14a39b" stroke-width="2" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="13" ry="5.5" fill="none" stroke="#2f6fed" stroke-width="2" transform="rotate(120 16 16)"/></svg>';
  function nav(href, label, key) { return '<a href="' + root + href + '"' + (page === key ? ' class="on"' : "") + ">" + label + "</a>"; }
  var hdr = document.getElementById("site-header");
  if (hdr) {
    hdr.className = "site-header";
    hdr.innerHTML = '<div class="wrap"><a class="logo" href="' + root + 'index.html">' + logoSvg + "<span>Phys<b>Lab</b></span></a>" +
      '<nav class="nav" aria-label="Main">' + nav("index.html", "Home", "home") + nav("index.html#library", "Simulations", "lib") + nav("about.html", "About", "about") + nav("contact.html", "Contact", "contact") + "</nav></div>";
  }
  var ftr = document.getElementById("site-footer");
  if (ftr) {
    ftr.className = "site-footer";
    ftr.innerHTML = '<div class="wrap"><div class="cols"><div><strong>' + esc(C.siteName) + "</strong><br>" + esc(C.tagline) + "<br>&copy; " + new Date().getFullYear() + " " + esc(C.ownerName) + '</div><div><a href="' + root + 'about.html">About</a><a href="' + root + 'contact.html">Contact</a><a href="' + root + 'privacy.html">Privacy Policy</a><a href="' + root + 'terms.html">Terms</a></div></div></div>';
  }

  /* ---------- ads ---------- */
  var consent = null;
  try { consent = localStorage.getItem("physlab_consent"); } catch (e) {}
  function loadAdsScript() {
    if (!C.adsenseClient || window.__adsLoaded) return;
    window.__adsLoaded = true;
    window.adsbygoogle = window.adsbygoogle || [];
    if (consent === "no") window.adsbygoogle.requestNonPersonalizedAds = 1;
    var s = document.createElement("script");
    s.async = true; s.crossOrigin = "anonymous";
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + encodeURIComponent(C.adsenseClient);
    document.head.appendChild(s);
  }
  function fillAds() {
    var slots = document.querySelectorAll(".ad-slot[data-slot]");
    for (var i = 0; i < slots.length; i++) {
      var el = slots[i], key = el.getAttribute("data-slot"), id = C.adSlots[key];
      if (C.adsenseClient && id) {
        el.innerHTML = '<div class="ad-label">Advertisement</div><ins class="adsbygoogle" style="display:block" data-ad-client="' + esc(C.adsenseClient) + '" data-ad-slot="' + esc(id) + '" data-ad-format="auto" data-full-width-responsive="true"></ins>';
        try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
      } else if (C.showAdPlaceholders) {
        el.className += " placeholder"; el.textContent = "Ad space (" + key + ")";
      } else { el.style.display = "none"; }
    }
  }
  function consentBanner() {
    if (!C.adsenseClient || consent) return;
    var b = document.createElement("div");
    b.className = "consent"; b.style.display = "block"; b.setAttribute("role", "dialog");
    b.innerHTML = "<strong>Cookies and ads.</strong> This free site is supported by Google AdSense ads, which use cookies. You can allow personalised ads or choose non-personalised ads. See our <a href='" + root + "privacy.html'>Privacy Policy</a>.<div class='btns'><button class='btn' id='c-yes'>Allow personalised</button><button class='btn alt' id='c-no'>Non-personalised only</button></div>";
    document.body.appendChild(b);
    function pick(v) { try { localStorage.setItem("physlab_consent", v); } catch (e) {} consent = v; b.remove(); loadAdsScript(); fillAds(); }
    document.getElementById("c-yes").onclick = function () { pick("yes"); };
    document.getElementById("c-no").onclick = function () { pick("no"); };
  }
  function startAds() {
    if (C.adsenseClient && !consent) { consentBanner(); return; }
    loadAdsScript(); fillAds();
  }

  /* ---------- simulation page extras ---------- */
  var sim = null;
  for (var k = 0; k < C.sims.length; k++) if (C.sims[k].id === simId) sim = C.sims[k];
  if (sim) {
    document.title = sim.title + " - Free Physics Simulation | " + C.siteName;
    var t = document.getElementById("sim-title"); if (t) t.textContent = sim.title;
    var cr = document.getElementById("crumbs");
    if (cr) cr.innerHTML = '<a href="' + root + 'index.html">Home</a> &rsaquo; ' + esc(sim.cat) + " &rsaquo; " + esc(sim.title);
    var rel = document.getElementById("related");
    if (rel) {
      var list = C.sims.filter(function (s) { return s.id !== sim.id; });
      list.sort(function (a, b) { return (b.cat === sim.cat) - (a.cat === sim.cat); });
      rel.innerHTML = list.slice(0, 4).map(function (s) { return '<a href="' + root + s.file + '">' + esc(s.title) + "<small>" + esc(s.cat) + " &middot; " + esc(s.level) + "</small></a>"; }).join("");
    }
  }

  /* live <output> for every range input */
  function wireRanges() {
    var r = document.querySelectorAll('input[type=range]');
    r.forEach(function (inp) {
      var out = document.getElementById(inp.id + "-o");
      if (!out) return;
      var u = inp.getAttribute("data-unit") || "", d = parseInt(inp.getAttribute("data-dec") || "0", 10);
      function up() { out.textContent = Number(inp.value).toFixed(d) + (u ? " " + u : ""); }
      inp.addEventListener("input", up); up();
    });
  }

  /* ---------- public helper API ---------- */
  window.PL = {
    $: function (id) { return document.getElementById(id); },
    val: function (id) { return parseFloat(document.getElementById(id).value); },
    /* responsive HiDPI canvas. returns {c, ctx, w, h}; w/h in CSS px and update on resize */
    stage: function (canvasId, aspect, onresize) {
      var c = document.getElementById(canvasId), S = { c: c, ctx: c.getContext("2d"), w: 0, h: 0 };
      function fit() {
        var w = c.parentElement.clientWidth, h = Math.round(w / aspect), dpr = window.devicePixelRatio || 1;
        c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
        c.style.height = h + "px";
        S.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        S.w = w; S.h = h;
        if (onresize) onresize(S);
      }
      window.addEventListener("resize", fit); fit();
      /* pointer position in CSS px */
      S.pos = function (e) { var r = c.getBoundingClientRect(); return { x: (e.clientX - r.left) * (S.w / r.width), y: (e.clientY - r.top) * (S.h / r.height) }; };
      return S;
    },
    /* animation loop: fn(dt seconds) ; returns {stop,start} */
    loop: function (fn) {
      var last = 0, run = true;
      function f(t) { if (!run) return; var dt = Math.min(0.05, (t - last) / 1000 || 0.016); last = t; fn(dt); requestAnimationFrame(f); }
      requestAnimationFrame(f);
      return { stop: function () { run = false; }, start: function () { if (!run) { run = true; last = 0; requestAnimationFrame(f); } } };
    },
    arrow: function (ctx, x1, y1, x2, y2, color, lw) {
      var dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy); if (L < 2) return;
      var a = Math.atan2(dy, dx), hs = Math.min(9, L * 0.45);
      ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = lw || 2;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - Math.cos(a) * hs * 0.6, y2 - Math.sin(a) * hs * 0.6); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - hs * Math.cos(a - 0.4), y2 - hs * Math.sin(a - 0.4)); ctx.lineTo(x2 - hs * Math.cos(a + 0.4), y2 - hs * Math.sin(a + 0.4)); ctx.closePath(); ctx.fill();
    },
    set: function (id, txt) { var e = document.getElementById(id); if (e) e.textContent = txt; }
  };

  /* ---------- home page library ---------- */
  var libEl = document.getElementById("library-grid");
  if (libEl) {
    var cats = ["All"]; C.sims.forEach(function (s) { if (cats.indexOf(s.cat) < 0) cats.push(s.cat); });
    var fEl = document.getElementById("filters"), q = document.getElementById("q"), cur = "All";
    function draw() {
      var term = (q.value || "").toLowerCase(), n = 0;
      libEl.innerHTML = C.sims.filter(function (s) {
        return (cur === "All" || s.cat === cur) && (s.title + " " + s.desc + " " + s.cat).toLowerCase().indexOf(term) >= 0;
      }).map(function (s) {
        n++;
        return '<a class="card" href="' + s.file + '"><div class="thumb"><svg viewBox="0 0 120 120" role="img" aria-label="' + esc(s.title) + '">' + s.icon + '</svg></div><div class="body"><div class="tags"><span class="tag">' + esc(s.cat) + '</span><span class="tag lvl">' + esc(s.level) + "</span></div><h3>" + esc(s.title) + "</h3><p>" + esc(s.desc) + "</p></div></a>";
      }).join("");
      if (!n) libEl.innerHTML = '<div class="empty">No simulation matches your search.</div>';
    }
    fEl.innerHTML = cats.map(function (c) { return '<button class="chip' + (c === "All" ? " on" : "") + '" data-c="' + esc(c) + '">' + esc(c) + "</button>"; }).join("");
    fEl.addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return; cur = b.getAttribute("data-c");
      fEl.querySelectorAll(".chip").forEach(function (x) { x.classList.toggle("on", x === b); }); draw();
    });
    q.addEventListener("input", draw); draw();
    var cnt = document.getElementById("sim-count"); if (cnt) cnt.textContent = C.sims.length;
  }

  /* fill config values into text pages: <span data-cfg="siteName"></span> */
  document.querySelectorAll("[data-cfg]").forEach(function (el) {
    var v = C[el.getAttribute("data-cfg")]; if (v !== undefined) el.textContent = v;
  });
  document.querySelectorAll("a[data-mail]").forEach(function (a) { a.href = "mailto:" + C.contactEmail; a.textContent = C.contactEmail; });

  wireRanges();
  startAds();
})();
