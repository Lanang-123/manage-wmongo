import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const getUser = async (req, res) => {
    try {
        // Mendapatkan token akses dari header permintaan
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Token akses tidak tersedia", status: 401 });
        }

        // Mendekode token akses
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Token akses tidak valid", status: 403 });
            }

            // Dapatkan data user dari decoded token
            const { emailUser, userId, userNama, userRole } = decoded;

            // Kirim data user sebagai respons
            res.status(200).json({ id: userId, email: emailUser, nama: userNama, role: userRole, status: 200 });
        });
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 });
    }
}

const register = async (req, res) => {
    try {
        const { nama, email, password, role } = req.body;

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ nama, email, password: hashPassword, role });

        await newUser.save();

        res.status(201).json({ message: "Data berhasi ditambahkan", status: 201 });
    } catch (error) {
        res.status(400).json({ message: error.message, status: 400 });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan", status: 404 });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Password tidak cocok", status: 401 });
        }

        let emailUser = user.email;
        let userId = user._id;
        let userNama = user.nama;
        let userRole = user.role;

        const accessToken = jwt.sign({ emailUser, userId, userNama, userRole }, process.env.ACCESS_TOKEN);

        const refreshToken = jwt.sign({ emailUser, userId, userNama }, process.env.REFRESH_TOKEN_SECRET);

        await User.updateOne({ _id: user._id }, { refresh_token: refreshToken });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({ accessToken })
    } catch (error) {
        res.json({ error })
    }
}


export { register, login, getUser }