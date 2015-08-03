const $ = require('jquery');
const { Model, View, Collection } = require('backbone');

class HomeView extends View {
  constructor(options) {
    super(options);

    // Event Bindings
    this.events = {

    };

    // Initialize
  }

  // Bootstrap

  bootstrap() {
    return this.render();
  }

  // Rendering

  render() {
    this.$el.html($('#template-home').html());
    return this;
  }

  // UI Events

  // Backbone Events

  // Util

  // API Methods
}

export default HomeView;