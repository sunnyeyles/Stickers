import express, { Express, Request, Response } from "express";

import { Item } from "../models/model";

import bcrypt from "bcrypt";

//// GET ALL ITEMS FROM DB
export const getAllItemsFromDb = async (req: Request, res: Response) => {
  try {
    const allItems = await Item.find();
    if (!allItems) {
      res.status(404).json({ success: false, message: "Nothing found" });
    }
    res.status(201).json(allItems);
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

//// GET ITEMS BY CATEGORY
export const getItemsByCategory = async (req: Request, res: Response) => {
  const { category } = req.query;
  try {
    // Find the user in the database by email
    const items = await Item.findOne({ category });
    if (!items) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.status(201).json(items);
  } catch (error) {
    console.error("Error during authentication:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
