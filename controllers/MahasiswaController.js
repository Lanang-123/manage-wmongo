import Mahasiswa from "../models/MahasiswaModel.js";
import User from "../models/UserModel.js";
import monggose from "mongoose";


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

        const commonId1 = new monggose.Types.ObjectId();
        const commonId2 = new monggose.Types.ObjectId();



        // // Simpan data mahasiswa
        const newMahasiswa = new Mahasiswa({ id: commonId1, nama, nim, alamat, email, password });
        const newUser = new User({ id: commonId2, email, password, role: "Mahasiswa", nama });

        const session = await monggose.startSession();
        session.startTransaction();

        try {
            await newMahasiswa.save({ session });
            await newUser.save({ session });

            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }


        res.status(201).json({ message: "Mahasiswa berhasil ditambahkan", status: 201 });
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 });
    }
};