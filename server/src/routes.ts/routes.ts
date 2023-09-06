import express, { Router } from "express";
import { User } from "../models/model";
import { createNewUser, userAuth } from "../controllers/controller";

const router: Router = express.Router();

router.post("/create-user", createNewUser).post("/authenticate-user", userAuth);

export default router;
