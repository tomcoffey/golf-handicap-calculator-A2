class Score {
  constructor(userId, course, score, rating, slope, date = new Date()) {
    this.userId = userId;
    this.course = course;
    this.score = score;
    this.date = date;
  }
}

module.exports = Score;
