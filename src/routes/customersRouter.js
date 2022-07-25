import {Router} from "express";
import { getAllCustomers,getByIdCustomers,insertCustomers,updateCustomers } from "../controlles/customersController.js";
import { getCustomers,validaBody,validaId,validaBodyUpdate } from "../middlewares/customersMiddlewares.js";

const customersRoutes = Router()

customersRoutes.get("/customers?",getCustomers,getAllCustomers);
customersRoutes.get("/customers/:buscaId",validaId,getByIdCustomers);
customersRoutes.post("/customers",validaBody,insertCustomers);
customersRoutes.put("/customers/:updateId",validaBodyUpdate,updateCustomers);

export default customersRoutes;

