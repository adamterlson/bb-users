const $ = require('jquery');
const Backbone = require('backbone');
const HomeView = require('./app/homeView');
const UserCollection = require('./app/collections/userCollection');
const GroupCollection = require('./app/collections/groupCollection');

$(() => {
  const userCollection = new UserCollection();
  const groupCollection = new GroupCollection();

  $.when(userCollection.fetch(), groupCollection.fetch())
    .then(() => {;
      const homeView = new HomeView({ userCollection, groupCollection });
      homeView.bootstrap();

      $('#app').html(homeView.el);
    });
});