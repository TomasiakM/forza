import { Router } from "express";

import carRoute from "./car";
import authRoute from "./auth";
import messageRoute from "./message";

const router = Router();

router.use("/car", carRoute);
router.use("/auth", authRoute);
router.use("/message", messageRoute);

export default router;
