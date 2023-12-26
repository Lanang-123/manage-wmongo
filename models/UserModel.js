import mongoose from "mongoose"

const User = mongoose.Schema({
    nama: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ["Dosen", "Mahasiswa"],
    },
    refresh_token: {
        type: String,
    }
});

export default mongoose.model('User', User);