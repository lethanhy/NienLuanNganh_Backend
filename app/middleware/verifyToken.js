const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) {
        return res.sendStatus(401)
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log(decoded)

        next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(403)

    }

    // if(authHeader) {
    //     const token = authHeader.split(" ")[1];
    //     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
    //         if(err) res.status(403).json("Token is not valid!");
    //         req.user = user;
    //         next();
    //     })

    // } else {
    //     return res.status(401).json(" You are not authenticated!");
    // }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        } else{
            res.status(403).json("You are not alowed to do that!");
        }
    })

}

const verifyTokenAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            next()
        } else{
            res.status(403).json("You are not alowed to do that!");
        }
    })

}

module.exports = { verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAdmin,
};