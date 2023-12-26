import mongoose from "mongoose";

const MataKuliah = mongoose.Schema({
    kode_mk: {
        type: String,
        required: true
    },
    kode_pm: {
        type: String,
        require: true
    },
    matakuliah: {
        type: String,
        require: true
    }
})


export default mongoose.model('Matakuliah', MataKuliah);