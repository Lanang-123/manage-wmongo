import mongoose from "mongoose"

const User = mongoose.Schema({
    nama: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["Dosen", "Mahasiswa"],
        required: true
    },
    refresh_token: {
        type: String,
    }
});

export default mongoose.model('User', User);