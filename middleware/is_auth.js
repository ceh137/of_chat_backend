const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        let authHeader = req.get("Authorization");
        const token = authHeader.split(" ")[1];
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, 'somehypersecretthing')
        } catch (error) {
            console.log(token)
            console.log(error)
            return res.status(403).send({
                message: 'JWT expired',
            });
        }


        req.body.userId = decodedToken.userId;
        console.log(req.body.userId)
        next();
    } catch (e) {
        console.log(e)
        res.status(403).json({
            message: "Authentication error occurred"
        })
    }


}