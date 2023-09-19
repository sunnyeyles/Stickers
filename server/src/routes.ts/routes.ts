import express, { Router } from "express";
import { Request, Response } from "express";
import {
  getUserDetailsByEmail,
  getAllUsers,
} from "../controllers/user_controllers/users_controller";
import { createNewUser } from "../controllers/user_controllers/create_user";
import { changeUserPassword } from "../controllers/user_controllers/change_password";
import { userAuth } from "../controllers/user_controllers/user_auth";
import { userLogOut } from "../controllers/user_controllers/user_log_out";
import { getItemsInCategory } from "../controllers/item_controllers/get_items_in_category";
import {
  getAllItemsFromDb,
  getItemsByCategory,
} from "../controllers/user_controllers/items_controller";

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
router.get(
  "/item/get-items-in-category/:itemCategory",
  (req: Request, res: Response) => {
    const itemCategory = req.params.itemCategory as string;
    console.log("itemCategory:", itemCategory);

    if (typeof itemCategory !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid parameters" });
    }
    getItemsInCategory(req, res, itemCategory);
  }
);

export default router;
