import userModel from "../models/userModel.js";
export const getUserData = async (req, res) => {
    try {
        // const {userId} = req.body;
        const user = await userModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        } 
        res.json({
            success: true,
            message: "User data fetched successfully",
            userData: {
                name: user.name,
                isAccountverified: user.isAccountverified,
            }
        })
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}