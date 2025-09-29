class User {
  constructor(username, password, email, userId = null) {
    this.userId = userId || User.generateId(); 
    this.username = username;
    this.password = password;
    this.email = email;
  }

  static generateId() {
    return Date.now() + Math.floor(Math.random() * 1000); 
  }
}

module.exports = User;
