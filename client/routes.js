Router.configure({
  layoutTemplate: 'layout'
});
Router.route('/', function () {
  this.render('home');
});
Router.route('/countries', function () {
  this.render('countries');
});
Router.route('/about', function () {
  this.render('about');
});
