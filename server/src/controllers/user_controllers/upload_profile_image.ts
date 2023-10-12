import express, { Express, Request, Response } from "express";
import { envConfig } from '../../config/env_config'
import { User } from "../../models/model";

//// UPLOAD PROFILE IMAGE TO DB
export const uploadProfileImage = async (req: Request, res: Response) => {

    //console.log("request file",req.file)
    try {
        const userEmail = JSON.parse(JSON.stringify(req.body))
        const email: string = Object.values(userEmail).toString()

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.profileImage = envConfig.imagePath + "/" + req.file.filename;

        await user.save();
        res.status(201).json({ message: "New profile Image uploaded" });
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
};

