const $ = require('jquery');
const _ = require('underscore');
const { Model, View, Collection } = require('backbone');

class UserView extends View {
  constructor(options) {
    super(options);

    // Initialize
    this.template = _.template($('#template-users').html());
    this.userCollection = options.userCollection;
    this.groupCollection = options.groupCollection;

    this.listenTo(this.userCollection, 'add remove', this._onUsersCollectionChange);
  }
  
  // Backbone

  get events() {
    return {
      'submit #form-create-user': '_onFormCreateUserSubmit',
      'click .delete-user': '_onDeleteClick'
    }; 
  }

  // Bootstrap

  bootstrap() {
    return this.render();
  }

  // Rendering

  render() {
    this.$el.html(this.template({ 
      groups: this.groupCollection.toJSON(),
      users: this.userCollection.toJSON()
    }));
    return this;
  }

  // UI Events

  _onFormCreateUserSubmit(e) {
    e.preventDefault();
    const name = this.$('input[name=name]').val();

    this.userCollection.create({ name: name }, { wait: true });
  }

  _onDeleteClick(e) {
    const userId = $(e.target).closest('[data-user-id]').data('userId');
    const user = this.userCollection.get(userId);

    this._deleteUser(user);
  }

  // Backbone Events

  _onUsersCollectionChange() {
    this.render();
  }

  // Methods

  _deleteUser(user) {
    if (!confirm(`Are you sure you want to delete user ${user.get('name')}?  This will also delete ${user.get('name')} from all groups.`))
      return;

    return $.when.apply($, this.groupCollection.map(group => group.removeMember(user.id)))
      .then(() => user.destroy());
  }
}

export default UserView;