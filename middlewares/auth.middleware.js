const jwt = require('jsonwebtoken')
const config = require('config')
module.exports = (req, resp, next) => {
    if (req.method === 'OPTIONS') {
        return next;
    }
    try {
        const token = req.headers.Authorization.split(' ')[1]
        if (!token) {
            return resp.status(401).json({message: 'Not authorized'})
        }

        const decoded = jwt.verify(token, config.get('jwt-secret'))

        req.user = decoded
        next()
    } catch (e) {
        return resp.status(401).json({message: 'Not authorized'})
    }
}