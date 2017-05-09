// ==UserScript==
// @name         DBS+
// @namespace    https://deadbeefsociety.org
// @version      0.0.3
// @description  Make DBS better
// @author       somebody
// @match        *://deadbeefsociety.org
// @match        *://deadbeefsociety.org/*
// @match        *://*.deadbeefsociety.org
// @match        *://*.deadbeefsociety.org/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  let url = window.location.href;
  if (/scoreboard.deadbeefsociety.org\/?$/.test(url)) {
    let style = document.createElement('style');
    style.innerHTML = `\
.levelstats-cell:hover {
    background-color: #bbbbbb;
    cursor: pointer;
}`;
    document.head.appendChild(style);
    let observer = new MutationObserver(function (records) {
      for (let record of records)
        if (record.type === 'childList')
          for (let node of record.addedNodes)
            for (let child of node.childNodes)
              if (
                child.classList.contains('levelstats-cell') &&
                !/^ level 0x[0-9a-f]{2}$/.test(child.innerText) &&
                !/^ total cleared: \d+$/.test(child.innerText)
              )
                child.addEventListener('click', () => window.location.href = 'https://scoreboard.deadbeefsociety.org/view/' + child.innerText);
    });
    observer.observe(document.getElementById('levelstats'), { childList: true });
  } else if (/scoreboard.deadbeefsociety.org\/leaderboard\/?$/.test(url)) {
    let style = document.createElement('style');
    style.innerHTML = `\
.large-offset-2.leader:hover {
    background-color: #bbbbbb;
    cursor: pointer;
}`;
    document.head.appendChild(style);
    for (let node of [].slice.call(document.getElementsByClassName('large-offset-2'), 1))
      node.addEventListener('click', () => window.location.href = 'https://scoreboard.deadbeefsociety.org/view/' + node.innerText);
  }
})();
