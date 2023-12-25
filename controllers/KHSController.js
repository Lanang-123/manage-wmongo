import KHS from "../models/KHSModel.js";

// Mendapatkan semua data KHS
export const getKhs = async (req, res) => {
    try {
        const khs = await KHS.find();
        res.status(200).json({ data: khs, status: 200 });
    } catch (error) {
        res.status(400).json({ message: error.message, status: 400 });
    }
}


// Mendapatkan data KHS berdasarkan nim
export const getKhsByNim = async (req, res) => {
    const { nim } = req.params;

    try {
        const khs = await KHS.find({ nim: nim });
        if (khs.length === 0) {
            // Jika tidak menemukan data dengan nim yang diberikan
            return res.status(404).json({ message: 'Data not found', status: 404 });
        }

        res.status(200).json({ data: khs, status: 200 });
    } catch (error) {
        res.status(400).json({ message: error.message, status: 400 });
    }
}


// Menambahkan data KHS baru
export const createKhs = async (req, res) => {
    const { nama, nim, hasil } = req.body;

    try {
        const newKhs = new KHS({ nama, nim, hasil });
        await newKhs.save();
        res.status(201).json({ message: "Data berhasil ditambahkan", data: newKhs, status: 201 });
    } catch (error) {
        res.status(400).json({ message: error.message, status: 400 });
    }
}

// Mengupdate data KHS berdasarkan ID
export const updateKhs = async (req, res) => {
    const { id } = req.params;
    const { nama, nim, hasil } = req.body;

    try {
        const updatedKhs = await KHS.findByIdAndUpdate(
            id,
            { nama, nim, hasil },
            { new: true }
        );
        res.status(200).json({ message: "Data berhasil diupdate", data: updatedKhs, status: 200 });
    } catch (error) {
        res.status(400).json({ message: error.message, status: 400 });
    }
}

// Menghapus data KHS berdasarkan ID
export const deleteKhs = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedKhs = await KHS.findOneAndDelete({ _id: id });
        if (!deletedKhs) {
            // Jika tidak menemukan data dengan ID yang diberikan
            return res.status(404).json({ message: 'Data not found', status: 404 });
        }

        res.status(200).json({ message: "Data berhasil dihapus", status: 200 });
    } catch (error) {
        res.status(400).json({ message: error.message, status: 400 });
    }
}
