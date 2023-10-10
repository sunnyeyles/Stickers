import express, { Express, Request, Response } from "express";
import {User} from '../../models/model'

//// UPLOAD PROFILE IMAGE TO DB


export const uploadProfileImage = async (req: Request, res: Response) => {
    console.log(req.body)
    const { profileImage, _id } = req.body;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.profileImage = profileImage;
        await user.save();
        res.status(201).json({ message: "New profile Image uploaded", user });
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
};