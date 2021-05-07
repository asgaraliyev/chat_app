
import {
  Messages,
  Users
} from "../../lib/collections/index.js";
const Joi = require("joi");
Tracker.autorun(() => {
  console.log("hello IAM HERE")

})
const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: {
      allow: ["com", "net", "ru"],
    },
  }),
});
Template.footer.events({
  "click .right": function (e) {
    
    e.preventDefault();
    const messagesEl = document.getElementById("messages");
    const messageEl = document.getElementById("message");
    const theMessage = messageEl.value;
    if (theMessage && theMessage.length > 0) {
      Meteor.call("addMessage", theMessage, 1);
      setTimeout(function () {
        messagesEl.scrollTo(0, messagesEl.scrollHeight + 2000);
        messageEl.value = "";
      }, 500);
    }
  },
});
Template.home.helpers({
  messages: function () {
    return Messages.find().fetch();
  },
});
Template.home.events({
  "click .message": function (e) {
    const id = e.target.getAttribute("data-id");
    console.log(Messages.remove(id));
  },
});

Template.signup.events({
  "submit #sign-up-form": function (e) {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const result = schema.validate({
      username,
      email,
      password,
    });
    // const errorMessages = result?.error?.details
    if (result.error) {
      const errorMessages = result.error.details;
      errorMessages.map((message) => {
        sweetAlert(message.message);
      });
      return;
    }
    if (isThereAnyUserByThisEmail(email)) {
      sweetAlert("Already there is  a email such as this one ");
      return
    }
    if (isThereAnyUserByThisUsername(username)) {
      sweetAlert("Already there is  a username such as this one ");
      return
    }
    Meteor.call("registerUser", username, email, password, function (err, result) {
      if (!err) {
        localStorage.setItem("id", result)
        Router.go("/")
      }

    });
  },
});


Template.header.helpers({
  user: function () {

    checkIfShouldRedirect()
    const _id = isAuthed()
    if (_id) {
      const user = Users.findOne({
        _id
      })
      if (user) return user

    } else {
      Router.go("sign-up")
    }
  }
})

function isAuthed() {
  const _id = localStorage.getItem("id")
  if(_id)return _id
  return false
}
function checkIfShouldRedirect(){
  const curr = Router.current()
  console.log(curr,"curr")
  if (curr != "/sign-up" || curr != "/login") Router.go("login")
}

function isThereAnyUserByThisEmail(email) {
  const user = Users.findOne({
    email
  })
  return user ? true : false
}

function isThereAnyUserByThisUsername(username) {
  const user = Users.findOne({
    username
  })
  return user ? true : false
}