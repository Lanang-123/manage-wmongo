import Nilai from "../models/NilaiModel.js";

// Mendapatkan semua data Nilai
export const getNilai = async (req, res) => {
    try {
        const nilai = await Nilai.find();
        res.status(200).json({ data: nilai, status: 200 });
    } catch (error) {
        res.status(400).json({ message: error.message, status: 400 });
    }
}

// Menambahkan data Nilai baru
export const createNilai = async (req, res) => {
    const { nim, matakuliah, nilai } = req.body;

    try {
        const newNilai = new Nilai({ nim, matakuliah, nilai });
        await newNilai.save();
        res.status(201).json({ message: "Data berhasil ditambahkan", data: newNilai, status: 201 });
    } catch (error) {
        res.status(400).json({ message: error.message, status: 400 });
    }
}

// Mengupdate data Nilai berdasarkan ID
export const updateNilai = async (req, res) => {
    const { id } = req.params;
    const { nim, matakuliah, nilai } = req.body;

    try {
        const updatedNilai = await Nilai.findByIdAndUpdate(
            id,
            { nim, matakuliah, nilai },
            { new: true }
        );
        res.status(200).json({ message: "Data berhasil diupdate", data: updatedNilai, status: 200 });
    } catch (error) {
        res.status(400).json({ message: error.message, status: 400 });
    }
}

// Menghapus data Nilai berdasarkan ID
export const deleteNilai = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedNilai = await Nilai.findOneAndDelete({ _id: id });
        if (!deletedNilai) {
            // Jika tidak menemukan data dengan ID yang diberikan
            return res.status(404).json({ message: 'Data not found', status: 404 });
        }

        res.status(200).json({ message: "Data berhasil dihapus", status: 200 });
    } catch (error) {
        res.status(400).json({ message: error.message, status: 400 });
    }
}
