import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import createToken from "../utils/createToken.js";

// POST /api/users/register
export const createUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const userExist = await userModel.findOne({ email: email.trim().toLowerCase() });
        if (userExist) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            username: username.trim(),
            email: email.trim().toLowerCase(),
            password: hashedPassword
        });

        const savedData = await newUser.save();
        createToken(res, savedData._id);

        return res.status(201).json({
            message: "User created successfully",
            user: {
                userId: savedData._id,
                username: savedData.username,
                email: savedData.email,
                profilePic: savedData.profilePic,
                bio: savedData.bio
            }
        });
    } catch (error) {
        console.log("Error registering user:", error);
        res.status(500).json({ error: error.message });
    }
};

// POST /api/users/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const user = await userModel.findOne({ email: email.trim().toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        createToken(res, user._id);

        return res.status(200).json({
            message: "Login successful",
            user: {
                userId: user._id,
                username: user.username,
                email: user.email,
                profilePic: user.profilePic,
                bio: user.bio
            }
        });
    } catch (error) {
        console.log("Error logging in:", error);
        res.status(500).json({ error: error.message });
    }
};

// POST /api/users/logout
export const logoutUser = async (req, res) => {
    try {
        const isProduction = process.env.NODE_ENV === 'production';
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax'
        }).status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

// GET /api/users/me  — check current auth status (used on page load)
export const getMe = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            userId: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
            bio: user.bio
        });
    } catch (error) {
        console.log("Error fetching profile:", error);
        res.status(500).json({ error: error.message });
    }
};

// PUT /api/users/profile  — update profile
export const updateProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { username, bio } = req.body;

        if (username) user.username = username.trim();
        if (bio !== undefined) user.bio = bio;
        if (req.file) user.profilePic = `/uploads/${req.file.filename}`;

        const updated = await user.save();

        return res.status(200).json({
            userId: updated._id,
            username: updated.username,
            email: updated.email,
            profilePic: updated.profilePic,
            bio: updated.bio
        });
    } catch (error) {
        console.log("Error updating profile:", error);
        res.status(500).json({ error: error.message });
    }
};
