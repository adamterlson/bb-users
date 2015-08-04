const { Model } = require('backbone');

class GroupModel extends Model {
  constructor(options) {
    super(options);

    // Initialize
    this.urlRoot = 'http://localhost:3000/groups';
  }

  // Backbone Overrides

  defaults() {
    return {
      members: []
    };
  }

  // Backbone Events

  // API Methods

  addMember(userId) {
    this.get('members').push(userId);
    return this.save();
  }

  removeMember(userId) {
    const members = this.get('members');
    members.splice(members.indexOf(userId), 1);
    return this.save();
  }

  // Backbone Events

  // API Methods

  // Private
}

export default GroupModel;