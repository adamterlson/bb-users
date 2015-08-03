const { Model } = require('backbone');

class UserModel extends Model {
  constructor(options) {
    super(options);

    // Initialize
    this.urlRoot = 'http://localhost:3000/users';
  }

  // Backbone Overrides

  // Backbone Events

  // API Methods

  // Private
}

export default UserModel;