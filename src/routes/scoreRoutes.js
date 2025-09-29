const express = require('express');
const router = express.Router();
const ScoreDAO = require('../dao/ScoreDAO');

router.post('/', async (req, res) => {
  try {
    const score = await ScoreDAO.saveScore(req.body); // Added await
    res.json({ success: true, score });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


router.get('/:userId', async (req, res) => { 
  try {
    const userScores = await ScoreDAO.getScoresByUser(req.params.userId); 
    res.json({ success: true, scores: userScores });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/average/:userId', async (req, res) => { 
  try {
    const average = await ScoreDAO.calculateAverageScore(req.params.userId); 
    res.json({ success: true, average });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;