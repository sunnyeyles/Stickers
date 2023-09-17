import express, { Router } from "express";
import { User } from "../models/model";
import {
  getUserDetailsByEmail,
  getAllUsers,
} from "../controllers/users_controller";
import { createNewUser } from "../controllers/create_user";
import { changeUserPassword } from "../controllers/change_password";
import { userAuth } from "../controllers/user_auth";
import { userLogOut } from "../controllers/user_log_out";
import {
  getAllItemsFromDb,
  getItemsByCategory,
} from "../controllers/items_controller";

const router: Router = express.Router();

//// USER ENDPOINTS
router.post("/user/create-user", createNewUser);
router.post("/user/authenticate-user", userAuth);
router.post("/user/user-log-out", userLogOut);
router.put("/user/change-user-password", changeUserPassword);
router.get("/user/get-user-details-by-email", getUserDetailsByEmail);
router.get("/user/get-all-users", getAllUsers);

//// ITEM ENDPOINTS
router.get("/item/get-all-items", getAllItemsFromDb);
router.get("/item/get-items-by-category", getItemsByCategory);

export default router;
