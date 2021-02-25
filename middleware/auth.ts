const jwt = require("jsonwebtoken")

module.exports = function(req:any, res:any, next:any){
    const token = req.header("auth-token");
    if (!token) return res.status(401).json({message:"Authentication failed"})
    try {
        const val = jwt.verify(token,"anystring");
        req.user =val;
        next();

    }catch (err) {
        console.error(err);
        res.status(500).send({message:"Token invalid"})
    }
}
