import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);

        const user = await User.findOne({
            refres_token: refreshToken
        });
        if (!user) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, encoded) => {
            if (err) return res.sendStatus(403);
            const userId = user._id;
            const userNama = user.nama;
            const userEmail = user.email;
            const userRole = user.role;
            const accessToken = jwt.sign({ userId, userNama, userEmail, userRole }, process.env.ACCESS_TOKEN, { expiresIn: '15s' });

            res.json({ accessToken });
        })
    } catch (error) {
        console.log(error);
    }
}

export { refreshToken }
