/* ============================================================
   PhysLab site configuration  -  EDIT THIS FILE FIRST
   ============================================================ */
window.PHYSLAB = {
  siteName: "PhysLab",
  tagline: "Free interactive physics simulations for school and college students",
  siteUrl: "https://your-domain.com",          // <- your real domain (no trailing slash)
  contactEmail: "contact@your-domain.com",     // <- shown on the Contact page
  ownerName: "PhysLab Team",                   // <- shown in Privacy / About pages

  /* ---------- Google AdSense ----------
     1. Get approved at https://adsense.google.com
     2. Paste your publisher id below, e.g. "ca-pub-1234567890123456"
     3. Create ad units in AdSense and paste each slot id.
     While adsenseClient is empty, NO ads load.                   */
  adsenseClient: "",
  adSlots: { top: "", bottom: "", home: "" },
  showAdPlaceholders: false,   // set true while designing to see where ads will go

  /* ---------- Simulation registry ----------
     Add a new simulation by adding one object here + one file in /sims */
  sims: [
    { id: "projectile", file: "sims/projectile.html", title: "Projectile Motion", cat: "Mechanics", level: "School",
      desc: "Launch a cannonball. Change angle, speed, gravity and air drag and measure range and height.",
      icon: '<path d="M10 100 Q60 10 110 100" stroke="#14a39b" stroke-width="3" fill="none" stroke-dasharray="5 5"/><circle cx="110" cy="100" r="6" fill="#f0a202"/><rect x="6" y="96" width="22" height="9" rx="3" fill="#6b7b99" transform="rotate(-40 14 100)"/>' },
    { id: "pendulum", file: "sims/pendulum.html", title: "Pendulum Lab", cat: "Mechanics", level: "School",
      desc: "Swing a pendulum, drag the bob, and discover what really decides its period.",
      icon: '<line x1="60" y1="8" x2="94" y2="86" stroke="#9db0d0" stroke-width="3"/><circle cx="94" cy="92" r="12" fill="#f0a202"/><rect x="40" y="4" width="40" height="5" rx="2" fill="#6b7b99"/>' },
    { id: "spring", file: "sims/spring.html", title: "Spring and Mass (SHM)", cat: "Mechanics", level: "Both",
      desc: "Hooke's law, simple harmonic motion, damping and energy exchange with a live graph.",
      icon: '<path d="M6 60 h14 l6 -18 l12 36 l12 -36 l12 36 l12 -36 l6 18 h8" stroke="#14a39b" stroke-width="3" fill="none"/><rect x="92" y="42" width="26" height="36" rx="4" fill="#f0a202"/>' },
    { id: "incline", file: "sims/incline.html", title: "Inclined Plane and Friction", cat: "Mechanics", level: "Both",
      desc: "Tilt a ramp, set friction coefficients and see forces, acceleration and when a block slips.",
      icon: '<polygon points="6,100 114,100 114,30" fill="#2a3d5c"/><rect x="58" y="44" width="22" height="16" fill="#f0a202" transform="rotate(-27 58 44)"/>' },
    { id: "collisions", file: "sims/collisions.html", title: "Collisions in 1D", cat: "Mechanics", level: "Both",
      desc: "Elastic, inelastic and sticky collisions. Watch momentum stay constant while energy changes.",
      icon: '<rect x="12" y="52" width="34" height="34" rx="4" fill="#2f6fed"/><rect x="74" y="42" width="34" height="44" rx="4" fill="#f0a202"/><path d="M50 69 h18" stroke="#fff" stroke-width="3"/>' },
    { id: "orbits", file: "sims/orbits.html", title: "Gravity and Orbits", cat: "Gravity", level: "Both",
      desc: "Launch a planet around a star. Circular, elliptical or escape? Explore Kepler's laws.",
      icon: '<ellipse cx="60" cy="60" rx="48" ry="28" fill="none" stroke="#9db0d0" stroke-dasharray="4 4"/><circle cx="60" cy="60" r="10" fill="#f0a202"/><circle cx="100" cy="46" r="5" fill="#14a39b"/>' },
    { id: "waves", file: "sims/waves.html", title: "Wave Interference", cat: "Waves", level: "Both",
      desc: "A ripple tank with two sources. See constructive and destructive interference patterns.",
      icon: '<circle cx="40" cy="60" r="12" fill="none" stroke="#14a39b" stroke-width="2"/><circle cx="40" cy="60" r="26" fill="none" stroke="#14a39b" stroke-width="2"/><circle cx="82" cy="60" r="12" fill="none" stroke="#f0a202" stroke-width="2"/><circle cx="82" cy="60" r="26" fill="none" stroke="#f0a202" stroke-width="2"/>' },
    { id: "refraction", file: "sims/refraction.html", title: "Refraction and Snell's Law", cat: "Light", level: "School",
      desc: "Bend light between materials, find the critical angle and total internal reflection.",
      icon: '<rect x="0" y="60" width="120" height="50" fill="#1d3a66"/><path d="M20 10 L60 60 L84 108" stroke="#f0a202" stroke-width="3" fill="none"/><path d="M60 60 L100 14" stroke="#f0a202" stroke-opacity=".5" stroke-width="2" fill="none"/>' },
    { id: "circuits", file: "sims/circuits.html", title: "DC Circuits", cat: "Electricity", level: "School",
      desc: "Series and parallel resistors with moving charges. Verify Ohm's law and power.",
      icon: '<rect x="14" y="24" width="92" height="72" fill="none" stroke="#9db0d0" stroke-width="3"/><rect x="44" y="18" width="32" height="12" fill="#0f1b2d" stroke="#f0a202" stroke-width="3"/><line x1="12" y1="52" x2="12" y2="70" stroke="#14a39b" stroke-width="6"/>' },
    { id: "kinematics", file: "sims/kinematics.html", title: "Kinematics Graphs", cat: "Mechanics", level: "School",
      desc: "Set acceleration and starting velocity and watch position, velocity and acceleration graphs build live.",
      icon: '<path d="M10 100 L10 14 M10 100 L112 100" stroke="#9db0d0" stroke-width="2" fill="none"/><path d="M10 92 Q60 90 108 20" stroke="#14a39b" stroke-width="3" fill="none"/><path d="M10 70 L108 40" stroke="#f0a202" stroke-width="3" fill="none"/>' },
    { id: "energy", file: "sims/energy.html", title: "Work and Energy (Skate Park)", cat: "Mechanics", level: "Both",
      desc: "Roll a skater on a track and see kinetic, potential and thermal energy change with friction.",
      icon: '<path d="M8 20 Q60 130 112 20" stroke="#9db0d0" stroke-width="3" fill="none"/><circle cx="28" cy="48" r="7" fill="#f0a202"/><rect x="70" y="86" width="8" height="22" fill="#2f6fed"/><rect x="84" y="94" width="8" height="14" fill="#f0a202"/>' },
    { id: "buoyancy", file: "sims/buoyancy.html", title: "Buoyancy and Archimedes", cat: "Fluids", level: "School",
      desc: "Drop blocks of different density into liquids and see when they float, sink or hover.",
      icon: '<rect x="14" y="44" width="92" height="64" fill="#1d3a66"/><rect x="44" y="30" width="32" height="32" fill="#f0a202"/><path d="M14 44 H106" stroke="#cfe3ff" stroke-width="2"/>' },
    { id: "gas", file: "sims/gas.html", title: "Gas Laws", cat: "Thermal", level: "Both",
      desc: "Particles in a container: change temperature, volume and amount of gas and watch the pressure.",
      icon: '<rect x="14" y="22" width="76" height="76" fill="none" stroke="#9db0d0" stroke-width="3"/><rect x="90" y="18" width="8" height="84" fill="#8fa3c4"/><circle cx="34" cy="44" r="5" fill="#2f9cf0"/><circle cx="62" cy="70" r="5" fill="#d1495b"/><circle cx="50" cy="86" r="5" fill="#2f9cf0"/><circle cx="72" cy="40" r="5" fill="#f0a202"/>' },
    { id: "efield", file: "sims/efield.html", title: "Electric Field and Charges", cat: "Electricity", level: "College",
      desc: "Place positive and negative charges, drag them, and see field lines and potential.",
      icon: '<circle cx="34" cy="60" r="12" fill="#d1495b"/><circle cx="88" cy="60" r="12" fill="#2f6fed"/><path d="M46 56 Q60 36 76 54 M46 64 Q60 84 76 66" stroke="#cfe3ff" stroke-width="2" fill="none"/>' }
  ]
};
