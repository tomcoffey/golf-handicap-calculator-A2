let express = require('express');
let router = express.Router();  
let UserDAO = require('../dao/UserDAO');

router.post('/register', async (req, res) => {
  try {
    const user = await UserDAO.saveUser(req.body);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserDAO.getUserByUsername(username);
    
    if (user && user.password === password) {
      res.json({ 
        success: true, 
        user: { 
          userId: user.userId || user.id,
          username: user.username,
          name: user.name,
          email: user.email
        }
      });
    } else {
      res.json({ 
        success: false, 
        error: 'Invalid username or password' 
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const user = await UserDAO.getUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;