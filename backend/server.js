dotenv.config();

import express from "express";
import { connectPostgres, sequelize } from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./router/authrouter.js";
import productRoute from "./router/productRoute.js";
import SubscriptionRouter from "./router/subscriptionRouter.js"
import "./models/admin.js";
import "./models/product.js";
import "./models/productImg.js";
import "./models/subscription.js";


const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoute);
app.use("/api/product",productRoute);
app.use("/api/user",SubscriptionRouter);


connectPostgres().then(async () => {
  await sequelize.sync(); //create table if they don't exist
  app.listen(port, () => {
    console.log(`Server runnig at http://localhost:${port}`);
  });
});
