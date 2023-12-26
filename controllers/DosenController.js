import User from "../models/UserModel.js";

const getDosen = async (req, res) => {
    try {
        // Assuming you want to retrieve all users with the role 'Dosen'
        const dosenList = await User.find({ role: "Dosen" });

        res.status(200).json({ data: dosenList, status: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 });
    }
};


export { getDosen }