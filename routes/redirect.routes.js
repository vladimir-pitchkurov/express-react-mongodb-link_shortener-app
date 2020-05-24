const {Router} = require('express')

const Link = require('../models/Link')
const router = Router()

router.get('/:code', async (req, resp) => {
    try {
        const link = await Link.findOne({code: req.params.code})

        if (link) {
            link.clicks++
            await link.save()
            return resp.redirect(link.from)
        }

        resp.status(404).json({message: 'Link nod found...'})
    } catch (e) {
        resp.status(500).json('Something went wrong :(');
    }
})

module.exports = router