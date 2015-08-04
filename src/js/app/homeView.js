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
    this.listenTo(this.userCollection, 'highlight', this._onUserHighlight);
  }
  
  // Backbone

  get events() {
    return {
      'mouseover .pill': '_onPillMouseover',
      'mouseout .pill': '_onPillMouseout'
    }
  }

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
    const containers = this.$('.user-list')
      .add(this.$('.group-member-list'))
      .toArray();

    dragula(containers, {
      copy: true,
      direction: 'horizontal',
      accepts: (el, target, source, sibling) => {
        const groupId = parseInt(target.dataset.groupId, 10);
        const userId = parseInt(el.dataset.userId);
        return groupId && 
               userId &&
               target !== source && 
               !self._groupContainsUser(groupId, userId);
      },
      moves: (el, container, handle) => {
        return container.classList.contains('user-list')
      }
    })
      .on('drop', this._onDragulaDrop.bind(this))
      .on('over', (el, container) => {
        if (!container) return;
        container.className += ' ex-over';
      })
      .on('out', (el, container) => {
        if (!container) return;
        container.className = container.className.replace('ex-over', '');
      });
  }

  // UI Events

  _onDragulaDrop(el, target) {
    if (!target) return;

    const groupId = parseInt(target.dataset.groupId, 10);
    const userId = parseInt(el.dataset.userId);
    
    this.groupCollection.get(groupId).addMember(userId);
    this.render();
  }

  _onPillMouseover(e) {
    this._toggleHighlights(e.currentTarget.dataset.userId, true);
  }

  _onPillMouseout(e) {
    this._toggleHighlights(e.currentTarget.dataset.userId, false);
  }

  // Backbone Events

  _onUserCollectionSync() {
    this.render();
  }

  _onGroupCollectionSync() {
    this.render();
  }

  _onUserHighlight(user, toggle) {
    this.$('.pill[data-user-id=' + user.id + ']').toggleClass('highlight', toggle);
  }

  // Methods

  _groupContainsUser(groupId, userId) {
    const group = this.groupCollection.get(groupId);
    const groupMembers = group.get('members');
    return groupMembers && groupMembers.indexOf(userId) >= 0;
  }

  _toggleHighlights(userId, toggle) {
    const user = this.userCollection.get(userId);
    user.trigger('highlight', user, toggle);
  }
}

export default HomeView;