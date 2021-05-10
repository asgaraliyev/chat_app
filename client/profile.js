Template.myprofile.events({
    "click #logout":function(){
        Meteor.logout()
        FlowRouter.go("/sign-up")
    }
})