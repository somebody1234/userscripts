/**
 * @name NoReplyMention
 * @version 0.0.1
 * @source https://raw.githubusercontent.com/somebody1234/userscripts/master/NRM.plugin.js
 * @updateUrl https://raw.githubusercontent.com/somebody1234/userscripts/master/NRM.plugin.js
 */
module.exports = class NoReplyMention {
  start() { document.addEventListener('mouseup', NoReplyMention.f); }
  stop() { document.removeEventListener('mouseup', NoReplyMention.f); }
  static f(e) {
    if (e.target.getAttribute('aria-label') === 'Reply' || e.target.parentElement.getAttribute('aria-label') === 'Reply') {
      setTimeout(() => document.getElementsByClassName('da-mentionButton')[0].innerText === 'ON' && document.getElementsByClassName('da-mentionButton')[0].click(), 0);
    }
  }
}
