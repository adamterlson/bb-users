const $ = require('jquery');
const _ = require('underscore');
const { Model, View, Collection } = require('backbone');
const dragula = require('dragula');

const UsersView = require('./usersView');
const GroupsView = require('./groupsView');

class HomeView extends View {
  constructor(options) {
    super(options);

    // Initialize
    this.template = _.template($('#template-home').html());
    this.userCollection = options.userCollection;
    this.groupCollection = options.groupCollection;

    this.listenTo(this.userCollection, 'add remove sync', this._onUserCollectionSync);
    this.listenTo(this.groupCollection, 'add remove sync', this._onGroupCollectionSync);
  }
  
  // Backbone

  // Bootstrap

  bootstrap() {
    this.render();

    return this;
  }

  // Rendering

  render() {
    this.$el.html(this.template());

    this.renderUsers()
    this.renderGroups();
    this.renderDragula();

    return this;
  }

  renderUsers() {
    var usersView = new UsersView({ userCollection: this.userCollection, groupCollection: this.groupCollection });
    usersView.bootstrap();
    this.$('#users-container').html(usersView.el);
  }

  renderGroups() {
    var groupsView = new GroupsView({ userCollection: this.userCollection, groupCollection: this.groupCollection });
    groupsView.bootstrap();
    this.$('#groups-container').html(groupsView.el);
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
}

export default HomeView;