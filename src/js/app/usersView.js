const $ = require('jquery');
const _ = require('underscore');
const { Model, View, Collection } = require('backbone');

class UserView extends View {
  constructor(options) {
    super(options);

    // Event Bindings
    this.events = {

    };

    // Initialize
    this.template = _.template($('#template-users').html());
  }
  
  // Backbone

  // Bootstrap

  bootstrap() {
    return this.render();
  }

  // Rendering

  render() {
    let users = this.collection.toJSON();
    this.$el.html(this.template({ users: users }));
    return this;
  }

  // UI Events

  // Backbone Events

  // Methods
}

export default UserView;