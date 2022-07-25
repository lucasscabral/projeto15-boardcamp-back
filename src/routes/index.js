import { Router } from "express";
import categoriesRouter from "./categoriesRouter.js";
import gamesRouter from "./gamesRouter.js";
import customersRoutes from "./customersRouter.js";
import rentalsRoutes from "./rentalsRouter.js";

const router = Router();

router.use(categoriesRouter);
router.use(gamesRouter);
router.use(customersRoutes);
router.use(rentalsRoutes);

export default router;