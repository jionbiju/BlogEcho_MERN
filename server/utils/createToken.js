import jwt from 'jsonwebtoken';

const createToken = async (res,userId) => {
    const token = jwt.sign({id:userId},process.env.SECRET,{expiresIn:"3d"});
    res.cookie('jwt',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !== 'development',
        sameSite:'none',
        maxAge:30*24*60*60*1000
    })
    return token;
}
export default createToken;