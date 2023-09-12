import express, { Router } from "express";
import { User } from "../models/model";
import {
  createNewUser,
  userAuth,
  changeUserPassword,
  getUserDetailsByEmail,
  getAllUsers,
} from "../controllers/controller";

const router: Router = express.Router();

router.post("/user/create-user", createNewUser);
router.post("/user/authenticate-user", userAuth);
router.put("/user/change-user-password/:id", changeUserPassword);
router.get("/user/get-user-details-by-email", getUserDetailsByEmail);
router.get("/user/get-all-users", getAllUsers);

export default router;
