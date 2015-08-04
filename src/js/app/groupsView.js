const $ = require('jquery');
const _ = require('underscore');
const { Model, View, Collection } = require('backbone');

class GroupView extends View {
  constructor(options) {
    super(options);

    // Initialize
    this.template = _.template($('#template-groups').html());
    this.userCollection = options.userCollection;
    this.groupCollection = options.groupCollection;

    this.listenTo(this.groupCollection, 'add remove', this._onGroupsCollectionChange);
  }
  
  // Backbone

  get events() {
    return {
      'submit #form-create-group': '_onFormCreateUserSubmit',
      'click .delete': '_onDeleteClick',
      'click .remove-member': '_onRemoveMemberClick'
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

    if (!name) // HTML5 validation not supported
      return; 

    this.groupCollection.create({ name: name }, { wait: true });
  }

  _onDeleteClick(e) {
    const groupId = $(e.target).closest('[data-group-id]').data('groupId');
    const group = this.groupCollection.get(groupId);

    if (group.get('members').length !== 0) {
      return alert('Cannot delete group with members. Remove all members and try again.');
    } else if (!confirm(`Are you sure you want to delete group ${group.get('name')}?`)) {
      return;
    }

    group.destroy();
  }

  _onRemoveMemberClick(e) {
    const $target = $(e.currentTarget);
    const groupId =$target.closest('[data-group-id]').data('groupId');
    const userId = $target.closest('[data-user-id]').data('userId');

    this.groupCollection.get(groupId).removeMember(userId);
  }

  // Backbone Events

  _onGroupsCollectionChange() {
    this.render();
  }

  // Methods
}

export default GroupView;