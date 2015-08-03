const $ = require('jquery');
const _ = require('underscore');
const { Model, View, Collection } = require('backbone');

class GroupView extends View {
  constructor(options) {
    super(options);

    // Initialize
    this.template = _.template($('#template-groups').html());

    this.listenTo(this.collection, 'add remove', this._onCollectionChange);
  }
  
  // Backbone

  get events() {
    return {
      'submit #form-create-group': '_onFormCreateUserSubmit',
      'click .delete': '_onDeleteClick'
    }; 
  }

  // Bootstrap

  bootstrap() {
    return this.render();
  }

  // Rendering

  render() {
    let groups = this.collection.toJSON();
    this.$el.html(this.template({ groups: groups }));
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
    const groupId = $(e.target).closest('li').data('groupId');
    const group = this.collection.get(groupId);

    if (!confirm(`Are you sure you want to delete group ${group.get('name')}?`))
      return;

    group.destroy();
  }

  // Backbone Events

  _onCollectionChange() {
    this.render();
  }

  // Methods
}

export default GroupView;