function isAuthed(){
    const user=Meteor.userId()
    return user!=null
}
function rdrctIfNtAuthed(){
    if(!isAuthed())FlowRouter.go("/sign-up")
}
FlowRouter.route("/not-found",{
    name:"not-found",
    action(){
        BlazeLayout.render("layout",{main:"notfound"})
    }
})
FlowRouter.route("/", {
    name:"home",
    action(){
        rdrctIfNtAuthed()
        BlazeLayout.render("layout",{main:"home"})
    }
})
FlowRouter.route("/profile/:user", {
    name:"profile",
    action(params,queryParams){
        rdrctIfNtAuthed()
        let {user}=params
        if(!user)FlowRouter.go("not-found")
        Meteor.call("findByEmail",user)
        BlazeLayout.render("layout",{main:"profile"})
    }
})
FlowRouter.route("/my-profile", {
    name:"myprofile",
    action(){
        BlazeLayout.render("layout",{main:"myprofile"})
    }
})
FlowRouter.route("/sign-up", {
    name:"signup",
    action(){
        BlazeLayout.render("layout",{main:"signup"})
    }
})
