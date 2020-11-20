/**
 * @name NoReplyMention
 * @description Automatically sets replies to not mention target
 * @author somebody
 * @authorId 153146360705712128
 * @authorLink https://github.com/somebody1234
 * @version 0.0.1
 * @source https://raw.githubusercontent.com/somebody1234/userscripts/master/NRM.plugin.js
 * @updateUrl https://raw.githubusercontent.com/somebody1234/userscripts/master/NRM.plugin.js
 */
function f(e) {
  if (e.target.getAttribute('aria-label') === 'Reply' || e.target.parentElement.getAttribute('aria-label') === 'Reply') {
    setTimeout(() => { const btn = document.getElementsByClassName('mentionButton-3710-W')[0]; if (btn.innerText === 'ON') { btn.click(); } }, 0);
  }
}
module.exports = class NoReplyMention {
  start() { document.addEventListener('mouseup', f); }
  stop() { document.removeEventListener('mouseup', f); }
}
