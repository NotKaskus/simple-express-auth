// import enmap database
const enmap = require('../database/main');

const authentication = (req, res, next) => {
    // Get token from X-Access-Token header
    const token = req.get('X-Access-Token');
    
    // Check if there is X-Access-Token header
    if (!token)
        return res.status(403).send("X-Access-Token header is required for authentication");

    // Validate token
    if (!enmap.find(val => val.token === token))
        return res.status(401).send("Invalid Token");

    return next();
};

module.exports = authentication;