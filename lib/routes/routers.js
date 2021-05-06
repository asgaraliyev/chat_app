
Router.route('/', function () {
    this.render('home');
});
Router.route('/profile/:user_name', function () {
    this.render('profile');
});
Router.route("/sign-up", function () {
    this.render("signup")
})