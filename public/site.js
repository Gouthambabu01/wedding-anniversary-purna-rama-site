(() => {
  const wedding = { year: 1999, month: 9, day: 12 };
  const yearsNode = document.getElementById('anniversary-years');
  const countdownNode = document.getElementById('anniversary-countdown');
  const toast = document.getElementById('celebration-toast');
  const surpriseButton = document.getElementById('open-letter');
  const welcomeScreen = document.getElementById('welcome-screen');
  const welcomeButton = document.getElementById('welcome-open');
  const welcomeBurst = document.getElementById('welcome-burst');
  const welcomeStatus = document.getElementById('welcome-status');
  const anniversarySite = document.getElementById('anniversary-site');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let toastTimer;
  let welcomeTimer;
  let opening = false;

  if (welcomeScreen && welcomeButton && anniversarySite) {
    anniversarySite.inert = true;
    anniversarySite.setAttribute('aria-hidden', 'true');
    document.body.classList.add('is-welcome-locked');
    welcomeButton.focus({ preventScroll: true });
  }

  function updateAnniversary() {
    const today = new Date();
    const nowUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    const thisYear = today.getFullYear();
    const anniversaryThisYear = Date.UTC(thisYear, wedding.month, wedding.day);
    const years = thisYear - wedding.year - (nowUtc < anniversaryThisYear ? 1 : 0);
    const anniversaryToday = nowUtc === anniversaryThisYear;
    const nextAnniversaryYear = nowUtc < anniversaryThisYear ? thisYear : thisYear + 1;
    const nextAnniversary = Date.UTC(nextAnniversaryYear, wedding.month, wedding.day);
    const daysUntil = Math.ceil((nextAnniversary - nowUtc) / 86_400_000);

    if (yearsNode) yearsNode.textContent = String(years);
    if (countdownNode) {
      if (anniversaryToday) {
        countdownNode.textContent = `Today makes ${thisYear - wedding.year} beautiful years together. Happy anniversary!`;
      } else if (daysUntil === 1) {
        countdownNode.textContent = 'One more sleep until another beautiful anniversary.';
      } else if (daysUntil <= 30) {
        countdownNode.textContent = `${daysUntil} days until ${nextAnniversaryYear - wedding.year} beautiful years together.`;
      } else {
        countdownNode.textContent = 'Still making every year count.';
      }
    }
  }

  function showSurprise() {
    const letter = document.getElementById('letter');
    if (!letter) return;
    letter.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    if (toast) {
      toast.textContent = 'A little love, saved just for you.';
      toast.classList.add('is-visible');
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2700);
    }

    if (!reduceMotion) {
      for (let i = 0; i < 12; i += 1) {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        sparkle.setAttribute('aria-hidden', 'true');
        sparkle.style.left = `${8 + Math.random() * 84}vw`;
        sparkle.style.top = `${20 + Math.random() * 60}vh`;
        sparkle.style.setProperty('--drift', `${Math.round(Math.random() * 32 - 16)}px`);
        document.body.appendChild(sparkle);
        sparkle.addEventListener('animationend', () => sparkle.remove(), { once: true });
      }
    }
  }

  function celebrate() {
    if (!welcomeBurst || reduceMotion) return;
    const colors = ['#e2c28e', '#f5eee2', '#d9947e', '#ffffff'];
    const count = 34;
    for (let index = 0; index < count; index += 1) {
      const particle = document.createElement('span');
      const angle = (Math.PI * 2 * index) / count + (Math.random() - .5) * .2;
      const distance = 115 + Math.random() * Math.min(window.innerWidth, window.innerHeight) * .34;
      particle.className = 'welcome-confetti';
      particle.style.setProperty('--confetti-x', `${Math.cos(angle) * distance}px`);
      particle.style.setProperty('--confetti-y', `${Math.sin(angle) * distance}px`);
      particle.style.setProperty('--confetti-turn', `${Math.round(Math.random() * 720 - 360)}deg`);
      particle.style.setProperty('--confetti-delay', `${Math.round(Math.random() * 170)}ms`);
      particle.style.setProperty('--confetti-color', colors[index % colors.length]);
      welcomeBurst.appendChild(particle);
      particle.addEventListener('animationend', () => particle.remove(), { once: true });
    }
  }

  function revealAnniversary() {
    if (!welcomeScreen || !anniversarySite) return;
    anniversarySite.inert = false;
    anniversarySite.removeAttribute('aria-hidden');
    anniversarySite.classList.add('is-revealed');
    document.body.classList.remove('is-welcome-locked');

    const heroTitle = document.getElementById('hero-title');
    heroTitle?.setAttribute('tabindex', '-1');
    heroTitle?.focus({ preventScroll: true });
    welcomeScreen.setAttribute('aria-hidden', 'true');
    welcomeScreen.classList.add('is-leaving');
    welcomeTimer = window.setTimeout(() => {
      welcomeScreen.hidden = true;
    }, reduceMotion ? 30 : 700);
  }

  function openAnniversary() {
    if (opening || !welcomeScreen || !anniversarySite) return;
    opening = true;
    if (welcomeButton) welcomeButton.disabled = true;
    welcomeScreen.classList.add('is-celebrating');
    if (welcomeStatus) welcomeStatus.textContent = 'Surprise! Here comes your anniversary celebration.';
    celebrate();
    welcomeTimer = window.setTimeout(revealAnniversary, reduceMotion ? 150 : 1500);
  }

  updateAnniversary();
  welcomeButton?.addEventListener('click', openAnniversary);
  surpriseButton?.addEventListener('click', showSurprise);
})();
