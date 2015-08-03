const $ = require('jquery');
const _ = require('underscore');
const { Model, View, Collection } = require('backbone');

const UsersView = require('./usersView');
const UserCollection = require('./collections/userCollection');

class HomeView extends View {
  constructor(options) {
    super(options);

    // Event Bindings
    this.events = {

    };

    // Initialize
    this.template = _.template($('#template-home').html());
    this.userCollection = new UserCollection();
  }

  // Bootstrap

  bootstrap() {
    this.render();

    this.userCollection.fetch()
      .then(this.renderUsers.bind(this));

    return this;
  }

  // Rendering

  render() {
    this.$el.html(this.template());
    return this;
  }

  renderUsers() {
    var usersView = new UsersView({ collection: this.userCollection });
    usersView.bootstrap();
    this.$('#users-container').html(usersView.el);
  }

  // UI Events

  // Backbone Events

  // Util

  // API Methods
}

export default HomeView;