const $ = require('jquery');
const _ = require('underscore');
const { Model, View, Collection } = require('backbone');

class UserView extends View {
  constructor(options) {
    super(options);

    // Initialize
    this.template = _.template($('#template-users').html());

    this.listenTo(this.collection, 'add remove', this._onCollectionChange);
  }
  
  // Backbone

  get events() {
    return {
      'submit #form-create-user': '_onFormCreateUserSubmit',
      'click .delete': '_onDeleteClick'
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

    if (!name) // HTML5 validation not supported
      return; 

    this.collection.create({ name: name }, { wait: true });
  }

  _onDeleteClick(e) {
    const userId = $(e.target).closest('li').data('userId');
    const user = this.collection.get(userId);

    if (!confirm(`Are you sure you want to delete ${user.get('name')}?`))
      return;

    user.destroy();
  }

  // Backbone Events

  _onCollectionChange() {
    this.render();
  }

  // Methods
}

export default UserView;