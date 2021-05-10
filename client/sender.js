import * as help from "./helper"
Template.sender.events({
  "submit #sender": function (e) {
    e.preventDefault();
    const messageEl = document.getElementById("message");
    const theMessage = messageEl.value;
    messageEl.value = ""
    const repliedMessage=help.getReplyMessage()

    const repliedMessageId =repliedMessage?repliedMessage?._id:null
    const email = help.getUserEmail()
    if (theMessage && theMessage.length > 0) {
      Meteor.call("addMessage", theMessage, email,repliedMessageId, function () {
        help.removeReplyArea()
        help.scrollToBottom()
      });
    }
  },
  "click .fa-times-circle":function(){
    help.removeReplyArea()
  }
});


Template.sender.helpers({
  isReplyActive() {
    const replyMessage=Session.get("replyMessage")
    if(replyMessage==null)return false
    replyMessage.message=replyMessage.message.slice(0,100)
    return replyMessage
  }
})

