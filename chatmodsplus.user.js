// ==UserScript==
// @name         Chat Mods Plus
// @namespace    global
// @version      0.0.1
// @description  Moar commands
// @author       ASCII-only
// @match        *://stackoverflow.com/*
// @match        *://meta.stackoverflow.com/*
// @match        *://superuser.com/*
// @match        *://meta.superuser.com/*
// @match        *://serverfault.com/*
// @match        *://meta.serverfault.com/*
// @match        *://askubuntu.com/*
// @match        *://meta.askubuntu.com/*
// @match        *://*.stackexchange.com/*
// @match        *://answers.onstartups.com/*
// @match        *://meta.answers.onstartups.com/*
// @match        *://stackapps.com/*
// @match        *://mathoverflow.net/*
// @exclude      http://chat.stackexchange.com/*
// @exclude      http://chat.*.stackexchange.com/*
// @exclude      http://api.*.stackexchange.com/*
// @exclude      http://data.stackexchange.com/*
// @exclude      http://*/reputation
// @grant        none
// @updateURL    https://rawgit.com/somebody1234/userscripts/master/readerMode.user.js
// ==/UserScript==

function toggleSidebar () {
    $('#sidebar').toggle()&&$('#main').css('width', $('#main')[0].style.width === '100%' ? '70%' : '100%');

    return ChatExtension.CommandState.SucceedDoClear;
}

ChatExtension.define('sidebar', toggleSidebar);
ChatExtension.define('s', toggleSidebar);
