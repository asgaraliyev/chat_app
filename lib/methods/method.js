import {
    Messages,
    Users
} from "../collections/index.js"

if (Meteor.isServer) {
    Meteor.methods({
        addMessage: function (message, user) {
            Messages.insert({
                message,
                user,
                createDate: new Date()
            })
        },
        deleteMessage: function (_id) {
            console.log(Messages.remove(_di));
        },

        registerUser: function (username, email, password) {
            const user = Users.insert({
                username,
                email,
                password
            })
            return user

        }
    })

}