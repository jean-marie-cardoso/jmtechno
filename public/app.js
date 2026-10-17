(() => {
  'use strict';

  const form = document.getElementById('activity-form');
  const input = document.getElementById('activity-code');
  const feedback = document.getElementById('feedback');
  const links = new Map();

  const entries = [...(Array.isArray(window.JMTechnoLinks) ? window.JMTechnoLinks : []), ...(Array.isArray(window.JMTechnoShortcuts) ? window.JMTechnoShortcuts : [])];
  for (const entry of entries) {
    if (!entry || typeof entry.code !== 'string' || typeof entry.url !== 'string') continue;
    try {
      const url = new URL(entry.url);
      if (url.protocol !== 'https:' || url.hostname !== 'jean-marie-cardoso.github.io'
          || url.port || url.username || url.password || (!url.pathname.startsWith('/labo-techno/') && !['/classe-calme/', '/classe-calme/partage/'].includes(url.pathname))) continue;
      links.set(entry.code.toLowerCase(), url.href);
    } catch {
      // Ignore incomplete entries rather than guessing an activity address.
    }
  }

  function normalize(value) {
    const code = value.trim().toLowerCase().replace(/\s+/g, '');
    const match = /^(b?)([345])(?:e|\/)?(\d{1,2})\/?$/.exec(code);
    return match ? `${match[1]}${match[2]}${match[3].padStart(2, '0')}` : code;
  }

  function showError(message) {
    input.setAttribute('aria-invalid', 'true');
    feedback.textContent = message;
    input.focus();
  }

  input.addEventListener('input', () => {
    input.removeAttribute('aria-invalid');
    feedback.textContent = '';
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const code = normalize(input.value);
    if (!code) {
      showError('Écris le code donné par ton professeur.');
      return;
    }
    if (!links.size) {
      showError('Activités indisponibles. Recharge la page.');
      return;
    }
    const destination = links.get(code);
    if (!destination) {
      showError('Code inconnu. Vérifie le code donné par ton professeur.');
      return;
    }
    input.value = code;
    input.removeAttribute('aria-invalid');
    feedback.textContent = '';
    window.location.assign(destination);
  });
})();
