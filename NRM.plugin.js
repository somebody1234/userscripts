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
module.exports = class NoReplyMention {
  load() {
    this.createPendingReply = BdApi.findModuleByProps('createPendingReply');
    this.unpatch = function unpatch() {};
  }
  start() {
    this.unpatch = BdApi.monkeyPatch(
      this.createPendingReply,
      'createPendingReply',
      {before: data => data.methodArguments[0].shouldMention = false}
    );
  }
  stop() {
    this.unpatch();
    this.unpatch = function unpatch() {};
  }
}
