const {check, validationResult} = require("express-validator");
const config = require('config');
const jwt = require('jsonwebtoken');
const {Router} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User')
const router = Router();

router.post(
    '/register',
    [
        check('email', 'Bad email').isEmail(),
        check('password', 'Password must be between 6, 20 symbols.').isLength({min: 6, max: 20})
    ],
    async (req, resp) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return resp.status(400).json({
                    message: 'Incorrect registration data.',
                    errors: errors.array()
                });
            }
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

router.post(
    '/login',
    [
        check('email', 'Bad email').isEmail(),
        check('password', 'Password must be between 6, 20 symbols.').isLength({min: 6, max: 20})
    ],
    async (req, resp) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return resp.status(400).json({
                    message: 'Incorrect registration data.',
                    errors: errors.array()
                });
            }
            const {email, password} = req.body;
            const user = await User.findOne({email})
            if (!user) {
                resp.status(400).json({message: "User not found."});
                return;
            }

            const isMatch = await bcrypt.compare(password.user.password);

            if (!isMatch) {
                resp.status(400).json({message: "Bad login or password."});
                return;
            }

            const token = jwt.sign({
                userId: user.id
            }, config.get('jwt-secret'), {expiresIn: '1h'});

            resp.status(200).json({token, userId: user.id});

        } catch (e) {
            resp.status(500).json('Something went wrong :(');
        }
    });

module.exports = router;