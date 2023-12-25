import express from "express"
import { config } from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import Mahasiswa from "./routes/MahasiswaRoute.js";
import MataKuliah from "./routes/MataKuliahRoute.js";
import Nilai from "./routes/NilaiRoute.js";
import KHS from "./routes/KHSRoute.js"
import Auth from "./routes/AuthRoute.js"
import { verifyToken } from "./middleware/VerifyToken.js";




const app = express();
config();


const PORT = 5000 || process.env.PORT;

// Koneksi Db
const connectDb = async () => {
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('Database terkonesi');
    } catch (error) {
        console.log(error);
    }
}

connectDb();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use('/mahasiswa', verifyToken, Mahasiswa);
app.use('/matakuliah', verifyToken, MataKuliah);
app.use('/nilai', verifyToken, Nilai);
app.use('/khs', verifyToken, KHS);
app.use('/auth', Auth);



app.listen(PORT, () => {
    console.log('Port berjalan di PORT ' + PORT);
})