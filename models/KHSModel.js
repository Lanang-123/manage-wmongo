import mongoose from "mongoose";

const KHS = mongoose.Schema({
    nama: {
        type: String,
        require: true
    },
    nim: {
        type: Number,
        require: true
    },
    hasil: [
        {
            matakuliah: {
                type: String,
                required: true
            },
            nilai: {
                type: Number,
                required: true
            }
        }
    ]

});


export default mongoose.model('KHS', KHS);