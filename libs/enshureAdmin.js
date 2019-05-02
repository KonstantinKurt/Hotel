const request = require('request');
const jwt = require('jsonwebtoken');

module.exports = function validateToken(req, res, next) {
    const token = req.headers.token;
    let decodedJwt = jwt.decode(token, {complete: true});
    if(decodedJwt.payload[`custom:isAdmin`]===`true`){
        next();
    }
    else{
       return res.status(403).json({message: "Permissions denied"});
    }
    //res.status(200).json(decodedJwt.payload.sub);

};