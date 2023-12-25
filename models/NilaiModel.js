import mongoose from "mongoose";

const Nilai = mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    nim: {
        type: Number,
        require: true
    },
    matakuliah: {
        type: String,
        require: true
    },
    nilai: {
        type: Number,
        require: true
    }
});

export default mongoose.model('Nilai', Nilai);