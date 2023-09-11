import express, { Express, Request, Response } from "express";
import cors from "cors";
import router from "./routes.ts/routes";
import { connectToDatabase } from "./helper_functions/connect_to_db";
const app: Express = express();
const port = process.env.PORT || 3001;

connectToDatabase();
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
