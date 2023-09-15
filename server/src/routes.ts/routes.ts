import express, { Router } from "express";
import { User } from "../models/model";
import {
  createNewUser,
  userAuth,
  changeUserPassword,
  getUserDetailsByEmail,
  getAllUsers,
} from "../controllers/usersController";
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
