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

  comparator(model) {
    return model.get('name');
  }

  // Backbone Events

  // API Methods

  // Private
}

export default UserCollection;