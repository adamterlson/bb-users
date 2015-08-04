const $ = require('jquery');
const _ = require('underscore');
const { Model, View, Collection } = require('backbone');
const dragula = require('dragula');

class AssignmentView extends View {
  constructor(options) {
    super(options);

    // Initialize
    this.template = _.template($('#template-assignment').html());
    this.userCollection = options.userCollection;
    this.groupCollection = options.groupCollection;

    this.listenTo(this.userCollection, 'add remove sync', this._onUserCollectionSync);
    this.listenTo(this.groupCollection, 'add remove sync', this._onGroupCollectionSync);
  }
  
  // Backbone

  get events() {
    return {
      'click .remove-member': '_onRemoveMemberClick'
    }
  }

  // Bootstrap

  bootstrap() {
    return this.render();
  }

  // Rendering

  render() {
    this.$el.html(this.template({ 
      users: this.userCollection.toJSON(),
      groups: this.groupCollection.toJSON()
    }));

    this.renderDragula();

    return this;
  }

  renderDragula() {
    const self = this;
    const containers = this.$('.users-container')
      .add(this.$('.group-member-container'))
      .toArray();

    dragula(containers, {
      copy: true,
      accepts: (el, target, source, sibling) => {
        const groupId = parseInt(target.dataset.groupId, 10);
        const userId = parseInt(el.dataset.userId);
        return groupId && 
               userId &&
               target !== source && 
               !self._groupContainsUser(groupId, userId);
      },
      moves: (el, container, handle) => {
        return container.classList.contains('users-container')
      }
    })
      .on('drop', this._onDragulaDrop.bind(this));
  }

  // UI Events

  _onDragulaDrop(el, target) {
    if (!target) return;

    const groupId = parseInt(target.dataset.groupId, 10);
    const userId = parseInt(el.dataset.userId);
    
    this.groupCollection.get(groupId).addMember(userId);
    this.render();
  }

  _onRemoveMemberClick(e) {
    const $target = $(e.currentTarget);
    const groupId =$target.closest('div[data-group-id]').data('groupId');
    const userId = $target.closest('div[data-user-id]').data('userId');

    this.groupCollection.get(groupId).removeMember(userId);
  }

  // Backbone Events

  _onUserCollectionSync() {
    this.render();
  }

  _onGroupCollectionSync() {
    this.render();
  }

  // Util

  _groupContainsUser(groupId, userId) {
    const group = this.groupCollection.get(groupId);
    const groupMembers = group.get('members');
    return groupMembers && groupMembers.indexOf(userId) >= 0;
  }

  // API Methods
}

export default AssignmentView;