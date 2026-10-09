(() => {
  const wedding = { year: 1999, month: 9, day: 12 };
  const yearsNode = document.getElementById('anniversary-years');
  const countdownNode = document.getElementById('anniversary-countdown');
  const toast = document.getElementById('celebration-toast');
  const surpriseButton = document.getElementById('open-letter');
  let toastTimer;

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
    letter.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    if (toast) {
      toast.textContent = 'A little love, saved just for you.';
      toast.classList.add('is-visible');
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2700);
    }

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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

  updateAnniversary();
  surpriseButton?.addEventListener('click', showSurprise);
})();
