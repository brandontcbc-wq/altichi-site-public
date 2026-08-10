// AltiChi shared site behavior
// Loaded on every page. Injects nav/footer partials, then wires up
// active-link state, mobile drawer, hero tagline cycler, globe animation,
// and the case-study info modal (each guarded by element existence so
// this single file works safely across every page).

function injectPartial(url, targetId, afterInject) {
  fetch(url)
    .then(function (res) {
      if (!res.ok) throw new Error('Failed to load ' + url);
      return res.text();
    })
    .then(function (html) {
      var target = document.getElementById(targetId);
      if (target) {
        target.innerHTML = html;
        if (afterInject) afterInject();
      }
    })
    .catch(function (err) {
      console.error('AltiChi partial load error:', err);
    });
}

function setActiveNavLink() {
  var current = window.location.pathname.split('/').pop() || 'index.html';
  var pageMap = {
    'index.html': 'home',
    '': 'home',
    'services.html': 'services',
    'case-studies.html': 'case-studies',
    'about.html': 'about',
    'contact.html': 'contact'
  };
  var activeId = pageMap[current];
  document.querySelectorAll('a[data-page]').forEach(function (a) {
    a.classList.toggle('active', a.dataset.page === activeId);
  });
}

function toggleDrawer() {
  var drawer = document.getElementById('navDrawer');
  var btn = document.querySelector('.nav-hamburger');
  if (!drawer) return;
  var isOpen = drawer.classList.toggle('open');
  if (btn) btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function initTaglineCycler() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var specs = [
    'Cloud Architecture &amp; AI Solutions',
    'Agentic AI &amp; Workflows',
    'Cloud Security Automation',
    'DevOps &amp; CI/CD Delivery',
    'AI-Powered Enterprise Delivery'
  ];
  var idx = 0;
  var el = document.getElementById('spec-cycle');
  if (!el) return;
  setInterval(function () {
    el.classList.add('swapping');
    setTimeout(function () {
      idx = (idx + 1) % specs.length;
      el.innerHTML = specs[idx];
      el.classList.remove('swapping');
    }, 350);
  }, 3000);
}

function initGlobeAnimation() {
  var wrap = document.getElementById('globe-wrap');
  if (!wrap) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var pills = wrap.querySelectorAll('.orb-pill');
  var sweep = document.getElementById('globe-sweep');
  var pinRing = document.getElementById('pin-ring');
  if (!sweep || !pinRing || pills.length === 0) return;
  var angles = [];
  pills.forEach(function (p) {
    angles.push(parseFloat(p.dataset.offset) * Math.PI / 180);
  });
  var sweepAngle = 0, pinScale = 1, pinDir = 1;
  function tick() {
    var size = wrap.offsetWidth, cx = size / 2, cy = size / 2;
    pills.forEach(function (p, i) {
      var speed = parseFloat(p.dataset.speed);
      var rf = parseFloat(p.dataset.radiusFactor);
      var r = size * rf;
      angles[i] += speed * 0.008;
      p.style.left = (cx + r * Math.cos(angles[i]) - p.offsetWidth / 2) + 'px';
      p.style.top = (cy + r * Math.sin(angles[i]) - p.offsetHeight / 2) + 'px';
    });
    sweepAngle += 0.5;
    sweep.style.transform = 'rotate(' + sweepAngle + 'deg)';
    pinScale += pinDir * 0.01;
    if (pinScale > 1.5) pinDir = -1;
    if (pinScale < 1) pinDir = 1;
    pinRing.style.transform = 'scale(' + pinScale + ')';
    pinRing.style.opacity = 0.08 + (pinScale - 1) * 0.28;
    requestAnimationFrame(tick);
  }
  setTimeout(tick, 100);
}

// Case-study info-chip modal content and controller.
var AC = {
  info: {
    'sec-auth': { icon: '&#128272;', color: '#0891B2', title: 'MFA &amp; SSO Implementation', body: 'Implemented Multi-Factor Authentication and Single Sign-On across enterprise student and staff portals. SSO enabled seamless access across multiple systems using one set of credentials, reducing password fatigue and unauthorized access risk. MFA added a second verification layer, meeting institutional data security standards across regulated higher education environments.' },
    'sec-cibc': { icon: '&#127970;', color: '#2563EB', title: 'CIBC Secure Payment API', body: 'Led development and integration of a secure payment API with CIBC, one of Canada&#39;s largest Schedule I chartered banks. Students could make tuition and fee payments directly within institutional platforms without external redirects. Built to institutional security standards and coordinated across engineering, security, and banking vendor teams, with Figma prototyping validating the full payment flow.' },
    'lms-canvas': { icon: '&#127891;', color: '#7C3AED', title: 'Canvas LMS Platform', body: 'Canvas by Instructure is one of the most widely adopted Learning Management Systems globally, used at hundreds of universities and colleges including institutions across Canada such as the University of Toronto and Humber College. Every integration had to meet strict platform compatibility, security review, and vendor certification standards before multi-institution deployment.' },
    'lms-vendors': { icon: '&#128279;', color: '#2563EB', title: 'Vendor Integration Program', body: 'Managed a structured vendor integration program delivering Turnitin for academic integrity detection, Power BI for institutional reporting and analytics, and SMS notification services for student communications. Each required direct vendor engagement, roadmap alignment, UAT coordination, and post-deployment monitoring timed to academic calendar constraints.' }
  },
  pipeline: {
    'transmission': { icon: '&#9889;', color: '#2563EB', title: 'Transmission Pipelines', body: 'High-pressure, long-distance pipelines that move large volumes of oil and natural gas from production fields across states and provinces. These are the arteries of the energy grid, operating at pressures requiring continuous integrity monitoring and risk modeling to prevent failures that could affect millions of people.' },
    'distribution': { icon: '&#127968;', color: '#7C3AED', title: 'Distribution Networks', body: 'Lower-pressure local pipeline networks that branch from transmission lines to deliver natural gas and fuel directly to residential homes, commercial buildings, schools, and hospitals. Distribution systems serve millions of end-users daily and require precise asset management to maintain safe, reliable delivery at the community level.' },
    'storage': { icon: '&#127981;', color: '#0891B2', title: 'Storage Facilities', body: 'Underground reservoirs, tank farms, and above-ground facilities that hold strategic reserves of oil and natural gas. Storage assets stabilize national energy supply by absorbing excess production during low-demand periods and releasing reserves during peak demand, acting as a critical buffer for energy security across the United States.' }
  }
};

function acOpenModal(type, key) {
  var d = AC[type] && AC[type][key];
  var overlay = document.getElementById('ac-modal-overlay');
  var content = document.getElementById('ac-modal-content');
  if (!d || !overlay || !content) return;
  content.innerHTML =
    '<div style="font-size:2rem;margin-bottom:10px;">' + d.icon + '</div>' +
    '<div style="font-family:var(--font-display);font-size:1.1rem;font-weight:800;color:#0F172A;margin-bottom:8px;">' + d.title + '</div>' +
    '<div style="height:3px;background:' + d.color + ';border-radius:2px;margin-bottom:14px;width:36px;"></div>' +
    '<p style="font-size:0.9rem;color:#334155;line-height:1.8;margin:0;">' + d.body + '</p>';
  overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function acCloseModal() {
  var overlay = document.getElementById('ac-modal-overlay');
  if (!overlay) return;
  overlay.style.display = 'none';
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') acCloseModal();
});

document.addEventListener('DOMContentLoaded', function () {
  injectPartial('/partials/nav.html', 'nav-placeholder', setActiveNavLink);
  injectPartial('/partials/footer.html', 'footer-placeholder', null);
  initTaglineCycler();
  initGlobeAnimation();
});
