const { Collection } = require('backbone');
const GroupModel = require('../models/groupModel');

class GroupCollection extends Collection {
  constructor(options) {
    super(options);

    this.url = 'http://localhost:3000/groups';

    // Initialize
    
  }

  // Backbone Overrides

  // Backbone Events

  // API Methods

  // Private
}

export default GroupCollection;