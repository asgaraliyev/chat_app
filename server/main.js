import {
    Meteor
} from "meteor/meteor"
import {
    Messages
} from "../lib/collections"
import {
    Accounts
} from 'meteor/accounts-base'

if (Meteor.isServer) {

    Meteor.methods({
        findByEmail(email) {
            if (!email) return
            return Accounts.findUserByEmail(email)
        },
        addMessage(message, email, repliedMessageId) {
            if (message && email) Messages.insert({
                message,
                email,
                repliedMessageId
            })
        },
        removeMessage(message_id) {
            Messages.remove({
                _id: message_id
            })
        },
        findMessageById(message_id) {
            if (!message_id) return
            return Messages.findOne({
                _id: message_id
            })
        },
        getAllMessages() {
            return Messages.find({}).fetch()
        },
        getMessageById({id}) {
          
            if (!id) return
            return Messages.findOne({
                _id: id
            })
        }

    })

}