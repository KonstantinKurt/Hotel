
module.exports = function(req, res, next) {
    const bearerHeader = req.headers['Authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        req.token = bearer[1];
        next();
    } else {
        res.status(403).json({message: "invalid token"});
    }
};

