import express, { Router } from "express";
import { User } from "../models/model";
import {
  getUserDetailsByEmail,
  getAllUsers,
} from "../controllers/usersController";
import { createNewUser } from "../controllers/createUser";
import { changeUserPassword } from "../controllers/changePassword";
import { userAuth } from "../controllers/userAuth";
import {
  getAllItemsFromDb,
  getItemsByCategory,
} from "../controllers/itemsController";

const router: Router = express.Router();

//// USER ENDPOINTS
router.post("/user/create-user", createNewUser);
router.post("/user/authenticate-user", userAuth);
router.put("/user/change-user-password", changeUserPassword);
router.get("/user/get-user-details-by-email", getUserDetailsByEmail);
router.get("/user/get-all-users", getAllUsers);

//// ITEM ENDPOINTS
router.get("/item/get-all-items", getAllItemsFromDb);
router.get("/item/get-items-by-category", getItemsByCategory);

export default router;
