// ==UserScript==
// @name         DBS+
// @namespace    https://deadbeefsociety.org
// @version      0.0.1
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
      document.head.innerHTML = `\
    <title>dead beef society | leaderboard</title>
    <link href='https://fonts.googleapis.com/css?family=Ubuntu+Mono' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Ubuntu' rel='stylesheet' type='text/css'>
    <link rel=stylesheet type=text/css href="../static/css/foundation.min.css">
    <link rel=stylesheet type=text/css href="../static/css/app.css">
<style>
th, td {
    padding: 0.1rem 0;
    border: 2px solid #ffffff;
    font-size: 0.8rem;
}
th {
    background-color: #bbbbbb;
}
td {
    background-color: #dddddd;
}
.name:hover {
    background-color: #bbbbbb;
    cursor: pointer;
}
</style>`;
    document.body.innerHTML = `\
<body>
    <div class="top-bar flex-container align-justify align-middle">
        <div class="small-4 columns">
            <a href="/">dead beef society</a>
        </div>
        <div class="small-5 columns flex-container align-justify">
            <div class="small-2 columns"></div>
            <a class="right button top-button small-3 columns" href="/view">view score</a>
            <a class="right button top-button small-3 columns" href="/answers">record answers</a>
            <a class="right button top-button small-3 columns" href="/logout">log out</a>
        </div>
    </div>
    <center>
        <table class="medium" id="leaderboard">
            <thead id="leaderboard-head">
                <tr><th>Name</th><th>Score</th></tr>
            </thead>
            <tbody id="leaderboard-body">
            </tbody>
        </table>
    </center>
</body>`;
    var script = document.createElement('script');
    script.src = '//cdnjs.cloudflare.com/ajax/libs/socket.io/1.3.5/socket.io.min.js';
    script.type = 'text/javascript';
    document.head.appendChild(script);
    window.getJSON = function (url, callback) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200)
                callback(JSON.parse(request.responseText));
        };
        request.open('GET', url);
        request.send();
    };
    var users = window.users = {};
    window.refreshLeaderboard = function () {
        var leaderboard = Object.getOwnPropertyNames(users).map(function (name) {
            return users[name];
        }).sort(function (left, right) {
            return left.score > right.score ? -1 :
                   left.score < right.score ?  1 :
                    left.name >  right.name ?  1 :
                    left.name <  right.name ? -1 : 0;
        });
        var rows = document.getElementById('leaderboard-body'),
            child;
        while ((child = rows.firstChild))
            rows.removeChild(child);
        for (var i = 0; i < leaderboard.length; i++) {
            var row = document.createElement('tr'),
                nameCell = document.createElement('td'),
                scoreCell = document.createElement('td');
            nameCell.classList.add('name');
            nameCell.innerText = leaderboard[i].name;
            nameCell.addEventListener('click', function () {
                window.location.href = 'https://scoreboard.deadbeefsociety.org/view/' + leaderboard[i].name;
            });
            scoreCell.innerText = leaderboard[i].score;
            row.appendChild(nameCell);
            row.appendChild(scoreCell);
            rows.appendChild(row);
        }
    };
    window.onready = function () {
        function score (level) {
            getJSON('/levelstats/0x' + level.toString(16).padStart(2, '0'), function (data) {
                if (!data.new_score)
                    return;
		        for (var i = 0; i < data.users.length; i++) {
                    var name = data.users[i],
                         user = (users[name] = users[name] || {name: name, levels: {}, score:0});
                    user.levels[level] = true;
                    user.score = Object.getOwnPropertyNames(user.levels).length;
                }
                refreshLeaderboard();
                setTimeout(function () { score(level + 1); }, 0);
            });
        }
        score(0);
        var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + '/notifications');
        socket.on('notification', function(message) {
            var level = message.lvl;
            getJSON('/levelstats/' + level, function (status, data) {
		        for (var i = 0; i < data.users.length; i++) {
                    var name = data.users[i];
                    var user = (users[name] = users[name] || {name: name});
                    user.levels[level] = true;
                    user.score = Object.getOwnPropertyNames(user.levels).length;
                }
                refreshLeaderboard();
            });
        });
    };
    var interval = setInterval(function () {
        if (window.io) {
            window.onready();
            clearInterval(interval);
        }
    }, 1000);
  }
})();
