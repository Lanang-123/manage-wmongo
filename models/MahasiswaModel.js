import mongoose from "mongoose";

const Mahasiswa = mongoose.Schema({
    nama: {
        type: String,
        require: true,
    },
    nim: {
        type: Number,
        require: true,
        unique: true,
    },
    alamat: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String
    }
});

export default mongoose.model('Mahasiswa', Mahasiswa);
