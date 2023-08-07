const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');


const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers["authorization"];
    // console.log(authHeader)
    token = authHeader.split(" ")[1];
    // console.log("except start");
    // console.log(process.env.ACCESS_TOKEN_SECRET);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        console.log(decoded);
        if (err) {
            res.status(401);
            throw new Error("user is no authorized");
        }
        // console.log("hello this is in if");
        req.user = decoded.user;
        console.log(req.user);
        next();
    });

});

module.exports = validateToken;
