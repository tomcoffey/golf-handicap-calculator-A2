const pool = require('./database');
const Score = require('../domain/Score');



class ScoreDAO {
  static async saveScore(scoreData) {
    try {
      const result = await pool.query(
        'INSERT INTO scores (user_id, course, score, date) VALUES ($1, $2, $3, $4) RETURNING *',
        [scoreData.userId, scoreData.course, scoreData.score, scoreData.date || new Date()]
      );
      
      const savedScore = result.rows[0];
      return new Score(
        savedScore.user_id,
        savedScore.course,
        savedScore.score,
        savedScore.date
      );
    } catch (error) {
      throw new Error('Failed to save score: ' + error.message);
    }
  }

  static async getScoresByUser(userId) {
    try {
      const result = await pool.query(
        'SELECT * FROM scores WHERE user_id = $1 ORDER BY date DESC',
        [userId]
      );
      
      return result.rows.map(row => ({
        userId: row.user_id,
        course: row.course,
        score: row.score,
        date: row.date
      }));
    } catch (error) {
      console.error('Database error:', error);
      return [];
    }
  }

  static async calculateAverageScore(user_id) {
    try {
      const result = await pool.query(
        'SELECT AVG(score) as average FROM scores WHERE user_id = $1',
        [user_id]
      );
      
      const average = parseFloat(result.rows[0].average);
      return average ? Math.round(average) : null;
    } catch (error) {
      console.error('Database error:', error);
      return null;
    }
  }

  static async getAllScores() {
    try {
      const result = await pool.query('SELECT * FROM scores ORDER BY date DESC');
      return result.rows;
    } catch (error) {
      throw new Error('Failed to get all scores: ' + error.message);
    }
  }

  
}

module.exports = ScoreDAO;