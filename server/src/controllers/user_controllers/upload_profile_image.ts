import express, { Express, Request, Response } from "express";
import {User} from '../../models/model'




//// UPLOAD PROFILE IMAGE TO DB
export const uploadProfileImage = async (req: Request, res: Response) => {
    console.log("request body",req.body)
    console.log("request files",req.files)
    const { profileImage, email } = req.body;
    console.log("profileImage",profileImage)
    console.log("email", email)
    try {
        const user = await User.findById(email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.profileImage = req.file.originalname;
        await user.save();
        res.status(201).json({ message: "New profile Image uploaded", user });
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
};

