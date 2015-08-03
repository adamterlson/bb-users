const { Collection } = require('backbone');
const GroupModel = require('../models/groupModel');

class GroupCollection extends Collection {
  constructor() {
    super();

    // Initialize
    
    this.url = 'http://localhost:3000/groups';
    this.model = GroupModel;
  }

  // Backbone Overrides

  model() {
    return GroupModel;
  }

  // Backbone Events

  // API Methods

  // Private
}

export default GroupCollection;