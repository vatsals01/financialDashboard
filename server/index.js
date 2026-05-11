require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const UserModel = require('./models/User');
const authMiddleware = require('./middleware/auth');
const app = express();
app.use(express.json());
app.use(cors());
const secret = process.env.JWT_SECRET || 'fallback_secret_change_me';
const mongo_url = process.env.MONGO_URI;
mongoose.connect(mongo_url);
app.post("/api/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        if (email !== '' && hashedPassword !== '') {
            const user = new UserModel({
                _id: crypto.randomUUID(),
                email: email,
                password: hashedPassword
            });
            await user.save();
            const token = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: '7d' });
            return res.status(201).json({ message: "User registered successfully", token });
        }
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid email or password" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid email or password" });
        const token = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: '7d' });
        return res.status(200).json({ message: "Logged in successfully", token });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
})
// Protected route — requires a valid JWT token
app.get("/api/me", authMiddleware, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.status(200).json({ user });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});
const port = process.env.PORT || 3001;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});