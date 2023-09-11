import express, { Router } from "express";
import { User } from "../models/model";
import {
  createNewUser,
  userAuth,
  changeUserPassword,
} from "../controllers/controller";

const router: Router = express.Router();

router.post("/create-user", createNewUser);
router.post("/authenticate-user", userAuth);
router.put("/change-user-password/:id", changeUserPassword);

export default router;
