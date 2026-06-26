(() => {
  'use strict';

  const unitMeta = {
    celsius:    { symbol: '°C', label: 'Celsius',    el: document.getElementById('celsius') },
    fahrenheit: { symbol: '°F', label: 'Fahrenheit', el: document.getElementById('fahrenheit') },
    kelvin:     { symbol: 'K',  label: 'Kelvin',     el: document.getElementById('kelvin') },
  };

  const gaugeFill  = document.getElementById('gaugeFill');
  const gaugeBadge = document.getElementById('gaugeBadge');
  const gaugeEl     = document.getElementById('gauge');
  const statusEl    = document.getElementById('status');
  const resetBtn    = document.getElementById('resetBtn');

  const GAUGE_MIN = -40;
  const GAUGE_MAX = 60;


  const COLOR_STOPS = [
    { pct: 0,   rgb: [45, 125, 210] },
    { pct: ((0 - GAUGE_MIN) / (GAUGE_MAX - GAUGE_MIN)) * 100, rgb: [27, 94, 91] },
    { pct: 100, rgb: [232, 89, 12] },
  ];

  
  function toCelsius(value, unit) {
    if (unit === 'celsius') return value;
    if (unit === 'fahrenheit') return (value - 32) * 5 / 9;
    if (unit === 'kelvin') return value - 273.15;
  }

  function fromCelsius(c, unit) {
    if (unit === 'celsius') return c;
    if (unit === 'fahrenheit') return c * 9 / 5 + 32;
    if (unit === 'kelvin') return c + 273.15;
  }

  function formatNumber(n) {
    if (!Number.isFinite(n)) return '';
    let rounded = Math.round(n * 100) / 100;
    if (rounded === 0) rounded = 0; 
    return String(rounded);
  }

  function parseInput(raw) {
    if (typeof raw !== 'string') return NaN;
    const normalized = raw.trim().replace(',', '.');
    if (normalized === '' || normalized === '-' || normalized === '.') return NaN;
    return parseFloat(normalized);
  }

  function clamp(v, min, max) {
    return Math.min(max, Math.max(min, v));
  }

  
  function colorForPct(pct) {
    pct = clamp(pct, 0, 100);
    let lower = COLOR_STOPS[0];
    let upper = COLOR_STOPS[COLOR_STOPS.length - 1];
    for (let i = 0; i < COLOR_STOPS.length - 1; i++) {
      if (pct >= COLOR_STOPS[i].pct && pct <= COLOR_STOPS[i + 1].pct) {
        lower = COLOR_STOPS[i];
        upper = COLOR_STOPS[i + 1];
        break;
      }
    }
    const range = (upper.pct - lower.pct) || 1;
    const t = (pct - lower.pct) / range;
    const rgb = lower.rgb.map((c, i) => Math.round(c + (upper.rgb[i] - c) * t));
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  }

  function updateGauge(celsius) {
    const clampedC = clamp(celsius, GAUGE_MIN, GAUGE_MAX);
    const pct = ((clampedC - GAUGE_MIN) / (GAUGE_MAX - GAUGE_MIN)) * 100;
    const color = colorForPct(pct);

    gaugeFill.style.width = pct + '%';
    gaugeFill.style.backgroundColor = color;
    gaugeBadge.style.left = pct + '%';
    gaugeBadge.style.backgroundColor = color;

    const roundedTenth = Math.round(celsius * 10) / 10;
    gaugeBadge.textContent = formatNumber(roundedTenth) + '°C';
    gaugeEl.setAttribute(
      'aria-label',
      `Temperatuurmeter, huidige waarde ${formatNumber(roundedTenth)} graden Celsius`
    );
  }

  
  function checkKelvinValidity() {
    const field = unitMeta.kelvin.el.closest('.field');
    const value = parseInput(unitMeta.kelvin.el.value);
    if (!Number.isNaN(value) && value < 0) {
      field.classList.add('field--warning');
    } else {
      field.classList.remove('field--warning');
    }
  }

  
  let announceTimer = null;
  function announce(message) {
    statusEl.textContent = message;
    clearTimeout(announceTimer);
    announceTimer = setTimeout(() => { statusEl.textContent = ''; }, 3000);
  }

  
  function recalcFrom(sourceUnit) {
    const raw = unitMeta[sourceUnit].el.value;
    const num = parseInput(raw);
    if (Number.isNaN(num)) return;

    const c = toCelsius(num, sourceUnit);

    Object.keys(unitMeta).forEach((unit) => {
      if (unit !== sourceUnit) {
        unitMeta[unit].el.value = formatNumber(fromCelsius(c, unit));
      }
    });

    updateGauge(c);
    checkKelvinValidity();
  }

  Object.keys(unitMeta).forEach((unit) => {
    const el = unitMeta[unit].el;

    el.addEventListener('input', () => recalcFrom(unit));

    
    el.addEventListener('blur', () => {
      const num = parseInput(el.value);
      if (!Number.isNaN(num)) {
        el.value = formatNumber(num);
      }
    });

    el.addEventListener('focus', () => el.select());
  });

  
  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const unit = btn.dataset.copy;
      const { symbol, label, el } = unitMeta[unit];
      const text = `${el.value} ${symbol}`;

      try {
        await navigator.clipboard.writeText(text);
        btn.classList.add('is-copied');
        announce(`${label}-waarde gekopieerd: ${text}`);
        setTimeout(() => btn.classList.remove('is-copied'), 1500);
      } catch (err) {
        announce('Kopiëren is niet gelukt. Selecteer de waarde handmatig.');
      }
    });
  });

  
  resetBtn.addEventListener('click', () => {
    unitMeta.celsius.el.value = '0';
    recalcFrom('celsius');
    announce('Teruggezet naar 0 °C, het vriespunt van water.');
  });

  
  recalcFrom('celsius');
})();
