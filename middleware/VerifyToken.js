import jwt from "jsonwebtoken";

const blacklistedTokens = [];

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    // Periksa apakah token ada dalam daftar hitam
    if (blacklistedTokens.includes(token)) {
        return res.status(401).json({ message: "Token tidak valid", status: 401 });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            // Jika verifikasi gagal, tambahkan token ke dalam daftar hitam
            blacklistedTokens.push(token);
            return res.sendStatus(403);
        }

        req.email = decoded.emailUser;
        next();
    });
};

export { verifyToken };
