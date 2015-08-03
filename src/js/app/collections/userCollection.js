const { Collection } = require('backbone');
const UserModel = require('../models/userModel');

class UserCollection extends Collection {
  constructor(options) {
    super(options);

    this.url = 'http://localhost:3000/users';

    // Initialize
    
  }

  // Backbone Overrides

  // Backbone Events

  // API Methods

  // Private
}

export default UserCollection;