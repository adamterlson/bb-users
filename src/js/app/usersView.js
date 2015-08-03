const $ = require('jquery');
const _ = require('underscore');
const { Model, View, Collection } = require('backbone');

class UserView extends View {
  constructor(options) {
    super(options);

    // Initialize
    this.template = _.template($('#template-users').html());

    this.listenTo(this.collection, 'change', this._onCollectionChange);
  }
  
  // Backbone

  get events() {
    return {
      'submit #form-create-user': '_onFormCreateUserSubmit'
    }; 
  }

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

  _onFormCreateUserSubmit(e) {
    e.preventDefault();
    const name = this.$('input[name=name]').val();

    if (!name) return; // HTML5 validation not supported

    this.collection.create({ name: name });
  }

  // Backbone Events

  _onCollectionChange() {
    this.render();
  }

  // Methods
}

export default UserView;