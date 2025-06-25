const jwt = require('jsonwebtoken');
const JWT_SECTRET = process.env.JWT_TOKEN ; 
const authGuard = (req,res,next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({success:false,
        message:'Authorization token missing'});
    }
    const token = authHeader.split(' ')[1];
    try{
        const decode = jwt.verify(token,JWT_SECTRET);
        req.user = decode;
        next();
    }catch (error) {
        return res.status(401).json({ success : false,
        message:'invalid or expired token'});
    }
}


module.exports=authGuard;