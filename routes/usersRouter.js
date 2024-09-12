const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logout } = require('../controllers/authControllers');
// router.get('/', function (req, res) {
//     res.send('Hello from the homepage!');
// })
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);

module.exports = router;

