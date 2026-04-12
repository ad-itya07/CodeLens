import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required!",
        });
    }

    try {
        const userExists = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists!",
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword,
            },
        });
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        return res.status(200).json({
            success: true,
            message: "User registered successfully!",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (err) {
        console.error("Prisma Error in register:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: err
        });
    }
}

export async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required!",
        });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found!",
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid password!",
            });
        }


        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        return res.status(200).json({
            success: true,
            message: "User logged in successfully!",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (err) {
        console.error("Prisma Error in login:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: err
        });
    }
}

export async function getMe(req, res) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!",
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (err) {
        console.error("Prisma Error in getMe:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: err
        });
    }
}
