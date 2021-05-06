import {
    Messages
} from "../../lib/collections/index.js"
const Joi = require("joi")

window.__proto__.message = function (message, type, sec) {
    const alertEl = document.getElementById("alert")
    console.log(alertEl)
    console.log(alertEl.classList.contains("active"))
}
message()
const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'net', "ru"]
            }
        })
})
Template.footer.events({
    "click .right": function (e) {
        e.preventDefault();
        const messagesEl = document.getElementById("messages")
        const messageEl = document.getElementById("message")
        const theMessage = messageEl.value
        if (theMessage && theMessage.length > 0) {
            Meteor.call("addMessage", theMessage, 1)
            setTimeout(function () {
                messagesEl.scrollTo(0, messagesEl.scrollHeight + 2000);
                messageEl.value = ""
            }, 500);
        }

    }

});
Template.home.helpers({
    messages: function () {
        return Messages.find().fetch()
    }

})
Template.home.events({
    "click .message": function (e) {
        const id = e.target.getAttribute("data-id")
        console.log(Messages.remove(id))
    }
})

Template.signup.events({
    "submit #sign-up-form": function (e) {
        e.preventDefault()
        const username = e.target.username.value
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(schema)
        const result = schema.validate({
            username,
            email,
            password
        });
        console.log(result, "result")
        // const errorMessages = result?.error?.details
        const errorMessages = result.error.details
        console.log(errorMessages, "messages")
    }
})