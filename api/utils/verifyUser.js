import jwt from "jsonwebtoken"
export const verifyToken = async(req,res,next)=>{
    const token =req.cookie.access_token
    console.log(token)
    if(!token){
        res.status(401).json("You need to login")
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){return res.status(403).json("token is not valid")}
        req.user = user
        next()
    })
}