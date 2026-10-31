let users = [];

class AuthModel {
  static findByEmail(email) {
    return users.find(user => user.email === email);
  }

  static create(userData) {
    const newUser = { id: Date.now().toString(), ...userData };
    users.push(newUser);
    return newUser;
  }
}

module.exports = AuthModel;