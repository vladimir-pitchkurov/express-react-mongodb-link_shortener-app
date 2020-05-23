const jwt = require('jsonwebtoken')
const config = require('config')
module.exports = (req, resp, next) => {
    if (req.method === 'OPTIONS') {
        return next;
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return resp.status(401).json({message: 'Not authorized, token not found'})
        }
        const secret = config.get('jwt-secret');

        const decoded = jwt.verify(token, secret)

        req.user = decoded
        return next()
    } catch (e) {
        return resp.status(401).json({message: 'Not authorized: ' + e.message})
    }
}