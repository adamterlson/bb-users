const $ = require('jquery');
const _ = require('underscore');
const { Model, View, Collection } = require('backbone');
const dragula = require('dragula');

const UsersView = require('./usersView');
const GroupsView = require('./groupsView');
const AssignmentView = require('./assignmentView');
const UserCollection = require('./collections/userCollection');
const GroupCollection = require('./collections/groupCollection');

class HomeView extends View {
  constructor(options) {
    super(options);

    // Initialize
    this.template = _.template($('#template-home').html());
    this.userCollection = new UserCollection();
    this.groupCollection = new GroupCollection();
  }
  
  // Backbone

  // Bootstrap

  bootstrap() {
    this.render();

    let fetchingUsers = this.userCollection.fetch()
      .then(this.renderUsers.bind(this));

    let fetchingGroups = this.groupCollection.fetch()
      .then(this.renderGroups.bind(this));

    $.when(fetchingUsers, fetchingGroups)
      .then(this.renderAssignmentView.bind(this));

    return this;
  }

  // Rendering

  render() {
    this.$el.html(this.template());
    return this;
  }

  renderUsers() {
    var usersView = new UsersView({ collection: this.userCollection });
    usersView.bootstrap();
    this.$('#users-container').html(usersView.el);
  }

  renderGroups() {
    var groupsView = new GroupsView({ collection: this.groupCollection });
    groupsView.bootstrap();
    this.$('#groups-container').html(groupsView.el);
  }

  renderAssignmentView() {
    var assignmentView = new AssignmentView({ 
      userCollection: this.userCollection,
      groupCollection: this.groupCollection 
    });

    assignmentView.bootstrap();

    this.$('#assignment-container').html(assignmentView.el);
  }

  // UI Events

  // Backbone Events

  // Util

  // API Methods
}

export default HomeView;