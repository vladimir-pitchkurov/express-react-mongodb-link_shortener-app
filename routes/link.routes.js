const config = require('config');
const {Router} = require('express');
const router = Router();
const Link = require('../models/Link');
const auth = require('../middlewares/auth.middleware')
const shortId = require('shortid')

router.post(
    '/generate',
    auth,
    async (req, resp) => {
        try {
            const baseUrl = config.get('baseUrl')
            const {from} = req.body
            const existing = await Link.findOne({from})

            if (existing) {
                return resp.json({link: existing})
            }
            const code = shortId.generate()
            const to = baseUrl + '/t/' + code;
            const link = new Link({code, to, from, owner: req.user.userId})
            await link.save();

            resp.status(201).json({link})
        } catch (e) {
            resp.status(500).json('Something went wrong :(');
        }
    });

router.get(
    '/',
    auth,
    async (req, resp) => {
        try {
            const links = await Link.find({owner: req.user.userId})

            resp.status(200).json(links);
        } catch (e) {
            resp.status(500).json('Something went wrong :(');
        }
    });

router.get(
    '/:id',
    auth,
    async (req, resp) => {
        try {
            const link = await Link.findById(req.params.id)
            resp.status(200).json(link)
        } catch (e) {
            resp.status(500).json('Something went wrong :(');
        }
    });

module.exports = router;