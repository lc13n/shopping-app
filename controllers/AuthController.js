// controllers/AuthController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, email });
    await user.save();
    res.status(201).send('User  registered');
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
    res.json({ token });
};

exports.logout = (req, res) => {
    // Xử lý logout (xóa token ở client)
    res.send('Logged out');
};

exports.forgotPassword = (req, res) => {
    // Xử lý quên mật khẩu
    res.send('Forgot password');
};

exports.resetPassword = (req, res) => {
    // Xử lý đặt lại mật khẩu
    res.send('Reset password');
};