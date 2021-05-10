import {
    Messages
} from "../lib/collections"
import * as help from "./helper"

Template.home.events({
    "click .remove-message": function (e) {
        const message_id = help.getIdFromElement(e)
        swal({
            title: 'Do you want delete this message?',
            text: 'You will not be able to recover this  message!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                Meteor.call("removeMessage", message_id, function () {
                    swal(
                        'Deleted!',
                        'Your message has been deleted.',
                        'success'
                    )
                })

            } else if (result.dismiss === 'cancel') {
                swal(
                    'Cancelled',
                    'Your message is safe :)',
                    'error'
                )
            }
        })

    },
    "click .reply-message":function(e){
        const message_id= help.getIdFromElement(e)

        Meteor.call("findMessageById",message_id,function(err,result){
            if(err)return swal('Oops...', 'Something went wrong!', 'error')
            Session.set("replyMessage",result)
        })
    }
})
Template.home.helpers({
    messages() {
        help.scrollToBottom()
        Meteor.call("getAllMessages",function(err,result){
            if(err)return
            Session.set("messages",result)
        })
        return Session.get("messages")
    },
    async isMe(id) {
        const thatMessage = await help.getMessageById(id)
        console.log(thatMessage)
        const {
            email
        } = thatMessage
        const actualEmail = help.getUserEmail()
        return email === actualEmail
    },
    findRepliedMessage(message_id){
        return  help.getMessageById(message_id)
    }
})

Template.home.onRendered(function () {
    help.scrollToBottom(500)
})