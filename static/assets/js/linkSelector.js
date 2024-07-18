const links = {
  '/home/': '/',
  '/blog/': '/blog',
  '/writings/': '/writings',
  '/posse/': '/syndications',
  '/more/': '/more',
  'rss': {
    'everything': '/atom.xml',
    'articles': '/writings/articles/atom.xml',
    'poems': '/writings/poems/atom.xml',
    'stories': '/writings/stories/atom.xml',
    'posse': '/syndicate/posse/atom.xml',
  },
}

let selectedLink = localStorage.currentAlias || 'home';

document.documentElement.dataset.link = selectedLink;


function updateLinkSelector() {
  const currentPath = window.location.pathname;
  const currentAlias = Object.entries(links).find(([_, path]) => path === currentPath)?.[0] || currentPath;

  let html = `<details><summary for="showLinkSelector"><span id="currentLink">${currentAlias}</span></summary>`;

  for (var id of Object.keys(links)) {
    if (typeof links[id] === 'string') {
      html += `<li><a${currentAlias === id ? ' class="current"' : ''} href="javascript:setLink('${id}')">${id}</a></li>`;
    } else {
      html += `<li><details${currentAlias.split('-')[0] === id ? ' open' : ''}><summary>${id}</summary>`;
      for (var alias in links[id]) {
        html += ` <li><a${currentAlias === alias ? ' class="current"' : ''} href="javascript:setLink('${alias}')">${alias}</a></li>`;
      }
      html += `</details></li>`;
    }
  }
  html += `</details>`;
  q('#linkSelector').innerHTML = html;
}


function setLink(alias) {
  let link;
  if (typeof links[alias] === 'string') {
    link = links[alias];
  } else {
    let category;
    for (let cat in links) {
      if (links[cat].hasOwnProperty(alias)) {
        category = cat;
        break;
      }
    }
    if (category) {
      link = links[category][alias];
    }
  }
  if (link) {
    localStorage.setItem('currentAlias', alias);
    document.documentElement.dataset.link = alias;
    selectedLink = alias;
    updateLinkSelector();
    window.location.href = link;
  } else {
    console.error(`Link with alias ${alias} not found.`);
  }
}
