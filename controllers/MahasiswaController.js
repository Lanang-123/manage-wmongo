import Mahasiswa from "../models/MahasiswaModel.js";
import User from "../models/UserModel.js";
import monggose from "mongoose";
import jwt from "jsonwebtoken";


const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
};


export const getMahasiswa = async (req, res) => {
    try {
        const mahasiswa = await Mahasiswa.find();
        res.status(200).json({ data: mahasiswa, status: 200 });
    } catch (error) {
        res.status(500).json({ "message": error, status: 400 });
    }
}

export const getMahasiswaLogin = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let searchEmail = '';

    if (!token) {
        return res.status(401).json({ message: "Token akses tidak tersedia", status: 401 });
    }

    // Mendekode token akses
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Token akses tidak valid", status: 403 });
        }

        // Dapatkan data user dari decoded token
        const { emailUser } = decoded;
        searchEmail = emailUser;
    });

    const data = await Mahasiswa.find({ email: searchEmail });
    return res.status(200).json({ data, status: 200 });
};

export const createMahasiswa = async (req, res) => {
    try {
        const { nama, nim, alamat } = req.body;

        // Cek apakah mahasiswa dengan nama tersebut sudah ada
        const existingMahasiswa = await Mahasiswa.findOne({ nim });

        if (existingMahasiswa) {
            return res.status(400).json({ message: "Mahasiswa dengan nim tersebut sudah ada", status: 400 });
        }

        // Generate email dari nama
        const email = `${nama.toLowerCase().replace(/\s/g, ".")}@gmail.com`;

        // Generate password sementara, bisa disesuaikan sesuai kebutuhan
        const password = generateRandomString(6);

        // Simpan data mahasiswa
        const newMahasiswa = new Mahasiswa({ nama, nim, alamat, email, password });
        await newMahasiswa.save();


        const newUser = new User({ email, password, role: "Mahasiswa", nama });
        await newUser.save();

        res.status(201).json({ message: "Data berhasil ditambahkan", status: 201 });
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 });
    }
};

export const updateMahasiswa = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, nim, alamat } = req.body;

        // Periksa apakah mahasiswa dengan id tersebut ada
        const existingMahasiswa = await Mahasiswa.findById(id);

        if (!existingMahasiswa) {
            return res.status(404).json({ message: "Mahasiswa tidak ditemukan", status: 404 });
        }

        // Update data mahasiswa
        existingMahasiswa.nama = nama;
        existingMahasiswa.nim = nim;
        existingMahasiswa.alamat = alamat;

        await existingMahasiswa.save();

        res.status(200).json({ message: "Data mahasiswa berhasil diperbarui", status: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 });
    }
};

export const deleteMahasiswa = async (req, res) => {
    try {
        const { id } = req.params;

        // Hapus data mahasiswa
        const resultMahasiswa = await Mahasiswa.findByIdAndDelete(id);

        // Hapus data user (jika ingin dihapus)
        if (resultMahasiswa) {
            await User.findOneAndDelete({ email: resultMahasiswa.email });
        }

        res.status(200).json({ message: "Data mahasiswa berhasil dihapus", status: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 });
    }
};
