const {Router} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User')
const router = Router();

router.post('/register', async (req, resp) => {
    try {
        const {email, password} = req.body;
        const candidate = await User.findOne({email})
        if (candidate) {
            resp.status(400).json({message: "User with this email has already exits."});
            return;
        }

        const hashedPass = await bcrypt.hash(password, 12);
        const user = new User({email, password: hashedPass});

        await user.save();

        resp.status(200).json({message: 'User is created successfully.'});

    } catch (e) {
        resp.status(500).json('Something went wrong :(');
    }
});

router.post('/login', async (req, resp) => {

});

module.exports = router;