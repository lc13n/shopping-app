const User = require('../models/User');

exports.profile = async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json(user);
};

exports.updateProfile = async (req, res) => {
    const { username, email } = req.body;
    await User.findByIdAndUpdate(req.user.id, { username, email });
    res.send('Profile updated');
};

exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    if (!(await bcrypt.compare(oldPassword, user.password))) {
        return res.status(401).send('Old password is incorrect');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(req.user.id, { password: hashedPassword });
    res.send('Password changed');
};

exports.orderHistory = async (req, res) => {
    // Giả sử bạn có một model Order
    const orders = await Order.find({ user: req.user.id }).populate('products.product');
    res.json(orders);
};
