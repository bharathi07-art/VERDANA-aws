import express from 'express';
import {SubscriptionFn} from "../controller/subscriptionController.js";

const router = express.Router();

router.post("/newSub",SubscriptionFn);

export default router;