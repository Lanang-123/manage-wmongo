import Nilai from "../models/NilaiModel.js";
import KHS from "../models/KHSModel.js";

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

        let khs = await KHS.findOne({ nim });

        // Jika KHS tidak ditemukan, buat yang baru
        if (!khs) {
            khs = new KHS({ nim });
        }

        // Tambahkan data nilai ke dalam properti 'hasil'
        khs.hasil.push({ matakuliah, nilai });

        // Simpan perubahan
        await khs.save();

        res.status(201).json({ message: "Data berhasil ditambahkan", data: newNilai, status: 201 });
    } catch (error) {
        res.status(400).json({ message: error.message, status: 400 });
    }
}

// Memperbarui data Nilai
export const updateNilai = async (req, res) => {
    try {
        const { id } = req.params;
        const { matakuliah, nilai } = req.body;

        // Periksa apakah nilai dengan id tersebut ada
        const existingNilai = await Nilai.findById(id);

        if (!existingNilai) {
            return res.status(404).json({ message: "Data nilai tidak ditemukan", status: 404 });
        }

        // Update data nilai
        existingNilai.matakuliah = matakuliah;
        existingNilai.nilai = nilai;

        await existingNilai.save();

        // Perbarui data nilai pada KHS jika ada
        await KHS.updateOne(
            { "hasil._id": id },
            { $set: { "hasil.$.matakuliah": matakuliah, "hasil.$.nilai": nilai } }
        );

        res.status(200).json({ message: "Data nilai berhasil diperbarui", status: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 });
    }
};

// Menghapus data Nilai
export const deleteNilai = async (req, res) => {
    try {
        const { id } = req.params;

        // Hapus data nilai
        const resultNilai = await Nilai.findByIdAndDelete(id);

        // Hapus data nilai pada KHS jika ada
        await KHS.updateOne(
            {},
            { $pull: { hasil: { _id: id } } },
            { multi: true }
        );

        res.status(200).json({ message: "Data nilai berhasil dihapus", status: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 });
    }
};