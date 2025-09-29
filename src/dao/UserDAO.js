const pool = require('./database');  

class UserDAO {
  static async saveUser(userData) {
    try {
      const result = await pool.query(
        `INSERT INTO users (username, email, password, name, id_number) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [userData.username, userData.email, userData.password, userData.name, userData.id_number]
      );
      
      const savedUser = result.rows[0];
      return {
        userId: savedUser.id,
        username: savedUser.username,
        email: savedUser.email,
        password: savedUser.password,
        name: savedUser.name,
        id_number: savedUser.id_number
      };
    } catch (error) {
      throw new Error('Failed to save user: ' + error.message);
    }
  }

  static async getUserByUsername(username) {
    try {
      const result = await pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
      );
      if (result.rows[0]) {
        const user = result.rows[0];
        return {
          userId: user.id,
          username: user.username,
          email: user.email,
          password: user.password,
          name: user.name,
          id_number: user.id_number
        };
      }
      return null;
    } catch (error) {
      console.error('Database error:', error);
      return null;
    }
  }
}

module.exports = UserDAO;
