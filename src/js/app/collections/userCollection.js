const { Collection } = require('backbone');
const UserModel = require('../models/userModel');

class UserCollection extends Collection {
  constructor() {
    super();

    // Initialize
    this.url = 'http://localhost:3000/users';
    this.model = UserModel;
  }

  // Backbone Overrides

  // Backbone Events

  // API Methods

  // Private
}

export default UserCollection;