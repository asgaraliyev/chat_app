import {
    Messages
} from "../lib/collections"
export const getUserEmail = () => {
    const user = Meteor.user()
    if (!user || !user.emails) return
    return user?.emails[0]?.address
}
export function scrollToBottom(sec = 50) {
    setTimeout(function () {
        const messagesEl = document.getElementById("messages")
        messagesEl.scrollTo(0, messagesEl.scrollHeight)
    }, sec)
}
export function getIdFromElement(el) {
    return el.target.getAttribute("data-id")
}
export function getReplyMessage() {
    return Session.get("replyMessage")
}
export function removeReplyArea() {
    Session.set("replyMessage", null)
}

function callMeteorCallback(name, args) {
    return new Promise(function (resolve, reject) {
        Meteor.call(name, args, function (err, result) {
            if (err) reject(err)
            resolve(result)
        })

    })
}
export async function getMessageById(id) {
    if (!id) return
    const result = await callMeteorCallback("getMessageById", {
        id
    }).then(res => res).catch(err => null)
    return result
}