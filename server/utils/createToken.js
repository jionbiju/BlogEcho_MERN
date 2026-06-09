import jwt from 'jsonwebtoken';

const createToken = async (res, userId) => {
    const token = jwt.sign({ id: userId }, process.env.SECRET, { expiresIn: "3d" });

    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: isProduction,                      // false on localhost (HTTP)
        sameSite: isProduction ? 'none' : 'lax',   // 'none' requires secure=true, so use 'lax' in dev
        maxAge: 3 * 24 * 60 * 60 * 1000           // 3 days
    });

    return token;
};

export default createToken;
