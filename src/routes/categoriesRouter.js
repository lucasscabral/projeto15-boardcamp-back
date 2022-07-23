import { Router } from "express";
import { getCategories,createCategories } from "../controlles/categoriesController.js";
import {validateBody} from "../middlewares/postCategoriesMiddlewares.js"

const categoriesRouter = Router()
categoriesRouter.get("/categories",getCategories)
categoriesRouter.post("/categories",validateBody,createCategories)

export default categoriesRouter;



