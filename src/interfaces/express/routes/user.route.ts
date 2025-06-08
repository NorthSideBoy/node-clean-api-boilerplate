// src/interfaces/express/routes/user.route.ts
import { Router } from "express";
import { createUserController } from "../controllers/user.controller";

const router = Router();

router.post("/register", createUserController);

export default router;
