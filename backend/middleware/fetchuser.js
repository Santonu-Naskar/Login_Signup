var jwt = require('jsonwebtoken');
const jwt_secret = process.env.jwt_secret;

const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({err: "Please provide valid token"});
    }
    try{
        const data=jwt.verify(token,jwt_secret);
        req.user=data.user;
        next()
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured")
    }
}

module.exports = fetchuser;