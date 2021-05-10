import * as help  from "./helper"
Template.header.helpers({
    user_email(){
        return help.getUserEmail()
    }
})