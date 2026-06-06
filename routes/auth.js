const express = require('express');
const passport = require('passport');
const router = express.Router();

// Iniciar OAuth con GitHub
router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

// Callback de GitHub OAuth
router.get('/callback', 
  passport.authenticate('github', { failureRedirect: '/auth/login' }),
  (req, res) => {
    res.redirect('/auth/profile');
  }
);

// Mostrar perfil del usuario logueado
router.get('/profile', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  res.status(200).json({
    message: 'Logged in successfully',
    user: req.user
  });
});

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out', error: err.message });
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
