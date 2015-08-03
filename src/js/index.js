const $ = require('jquery');
const _ = require('underscore');
const Backbone = require('backbone');
const HomeView = require('./app/homeView');

$(() => {
  var homeView = new HomeView();
  homeView.bootstrap();

  $('#app').html(homeView.el);

  Backbone.history.start();
});