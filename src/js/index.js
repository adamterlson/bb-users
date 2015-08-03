const $ = require('jquery');
const Backbone = require('backbone');
const HomeView = require('./app/homeView');

$(() => {
  var homeView = new HomeView();
  homeView.bootstrap();

  $('body').html(homeView.el);

  Backbone.history.start();
});