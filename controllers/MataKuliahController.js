import MataKuliah from "../models/MataKuliahModel.js";

export const getMataKuliah = async (req, res) => {
    try {
        const matakuliah = await MataKuliah.find();
        res.status(200).json({ data: matakuliah, status: 200 });
    } catch (error) {
        res.status(400).json({ "message": error });
    }
}

// Menambahkan data MataKuliah baru
export const createMataKuliah = async (req, res) => {
    const { kode_mk, kode_pm, matakuliah } = req.body;

    try {
        const newMataKuliah = new MataKuliah({ kode_mk, kode_pm, matakuliah });
        await newMataKuliah.save();
        res.status(201).json({ message: "Data berhasil ditambahkan", data: newMataKuliah, status: 201 });
    } catch (error) {
        res.status(400).json({ message: error.message, status: 400 });
    }
}

// Mengupdate data MataKuliah berdasarkan ID
export const updateMataKuliah = async (req, res) => {
    const { id } = req.params;
    const { kode_mk, kode_pm, matakuliah } = req.body;

    try {
        const updatedMataKuliah = await MataKuliah.findByIdAndUpdate(
            id,
            { kode_mk, kode_pm, matakuliah },
            { new: true }
        );
        res.status(200).json({ message: "Data berhasil diupdate", data: updatedMataKuliah, status: 200 });
    } catch (error) {
        res.status(400).json({ message: error.message, status: 400 });
    }
}

// Menghapus data MataKuliah berdasarkan ID
export const deleteMataKuliah = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedMataKuliah = await MataKuliah.findOneAndDelete({ _id: id });
        if (!deletedMataKuliah) {
            // Jika tidak menemukan data dengan ID yang diberikan
            return res.status(404).json({ message: 'Data not found', status: 404 });
        }

        res.status(200).json({ message: "Data berhasil dihapus", status: 200 });
    } catch (error) {
        res.status(400).json({ message: error.message, status: 400 });
    }
}

