import jwt from "jsonwebtoken";

export function adminAuth(req,res,next){
    const autheader = req.headers.authorization;
    const token = autheader?.split("")[1];

    if(!token){
           return res.status(401).json({error:"No token found"})
    }

    try{
        const decode = jwt.verify(token, process.env.JWT_Secret);
        req.admin= decode;
        next();
        
    }catch(error){
        return res.status(401).json({error:"Invalid or expired token"});
    }
}

