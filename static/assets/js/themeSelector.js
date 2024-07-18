const themes = {
  genre: [
    'poetic',
    'poetic-dark',
    'storific',
    'storific-dark',
    'articalistic',
    'articalistic-dark'
  ],
  dyslexic: [
    'light',
    'dark'
  ],
  everforest: [
    'light',
    'dark'
  ],
  gruvbox: [
    "light",
    "dark"
  ],
  night: [
    'solis',
    'spaceduck',
    'gotham',
    'dracula'
  ],
  nord: [
    'light',
    'dark'
  ],
  one: [
    'light',
    'dark'
  ],
  tokyo: [
    'night',
    'night-light'
  ],
  catppuccin: [
    'latte',
    'frappe',
    'macchiato',
    'mocha'
  ],
}
const defaultThemes = {
  light: "genre-storific",
  dark: "genre-storific-dark"
}
const prefersDark = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
let theme = localStorage.theme || (prefersDark ? defaultThemes.dark : defaultThemes.light);
let dynamic = localStorage.dynamic !== 'false';

document.documentElement.dataset.theme = theme;

const q = document.querySelector.bind(document);

function updateThemeSelector() {
  let html = `<details><summary for="showThemeSelector">theme: <span id="currentTheme">${theme}</span></summary>`;
  html += `<li><label><input type="checkbox" id="dynamicToggle" ${dynamic ? 'checked' : ''}> dynamic</label></li>`;
  for (var id of Object.keys(themes)) {
    if (themes[id].length) {
      html += `<li><details${theme.split('-')[0] === id ? ' open' : ''}><summary>${id}</summary>`;
    } else {
      html += `<li><a${theme === id ? ' class="current"' : ''}  href="javascript:setTheme('${id}')">${id}</a></li>`;
    }
    for (var variant of themes[id]) {
      html += ` <li><a${theme === id + '-' + variant ? ' class="current"' : ''} href="javascript:setTheme('${id}-${variant}')">${variant}</a></li>`;
    }
    if (themes[id].length) html += `</details></li>`;
  }
  html += `</details>`;
  q('#themeSelector').innerHTML = html;
  
  const colors = {
    fill: getComputedStyle(q('.main-background'))['backgroundColor'],
    stroke: getComputedStyle(q('.main-background'))['color']
  }
  
  document.querySelector('meta[name="theme-color"]').setAttribute("content", colors.fill);
  q('#dynamicToggle').addEventListener('change', toggleDynamic);
}

function setTheme(id) {
  localStorage.setItem('theme', id);
  document.documentElement.dataset.theme = id;
  theme = id;
  updateThemeSelector();
}

function toggleDynamic() {
  dynamic = q('#dynamicToggle').checked;
  localStorage.setItem('dynamic', dynamic);
  if (dynamic) {
    applyDynamicTheme();
  } else {
    setTheme(localStorage.getItem('theme') || theme);
  }
}

function applyDynamicTheme() {
  const genreElements = document.querySelectorAll('code');
  genreElements.forEach(el => {
    if (el.textContent.includes('Genre: Stories')) {
      setTheme(prefersDark ? 'genre-storific-dark' : 'genre-storific');
    } else if (el.textContent.includes('Genre: Poems')) {
      setTheme(prefersDark ? 'genre-poetic-dark' : 'genre-poetic');
    } else if (el.textContent.includes('Genre: Articles')) {
      setTheme(prefersDark ? 'genre-articalistic-dark' : 'genre-articalistic');
    } else if (el.textContent.includes('Genre: Reports')) {
      setTheme(prefersDark ? 'genre-articalistic-dark' : 'genre-articalistic');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateThemeSelector();
  if (dynamic) {
    applyDynamicTheme();
  }
});
