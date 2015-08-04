const { Model } = require('backbone');

class UserModel extends Model {
  constructor(options) {
    super(options);

    // Initialize
    this.urlRoot = 'http://localhost:3000/users';
  }

  // Backbone Overrides

  defaults() {
    return {
      name: ''
    };
  }

  destroy() {
    return Model.prototype.destroy.apply(this, arguments);
  }

  // Backbone Events

  // API Methods

  // Private
}

export default UserModel;