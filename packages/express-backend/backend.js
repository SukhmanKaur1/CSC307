import express from "express";
import cors from "cors";
import User from "./user.js"; // Import the User model from user.js

const app = express();
const port = 8000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Function to create a user
const createUser = async (userData) => {
    try {
        const newUser = new User(userData);
        await newUser.save();
        return newUser;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Function to delete a user by ID
const deleteUserById = async (userId) => {
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            throw new Error("User not found.");
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

// Function to get a user by ID
const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found.");
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

// GET request to fetch all users
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET request to fetch user by ID
app.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const user = await getUserById(id);
        res.send(user);
    } catch (error) {
        res.status(404).send("User not found.");
    }
});

// POST request to add a new user
app.post("/users", async (req, res) => {
    const userData = req.body;
    try {
        const newUser = await createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE request to delete a user by ID
app.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await deleteUserById(id);
        res.status(204).send();
    } catch (error) {
        res.status(404).send("User not found.");
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
