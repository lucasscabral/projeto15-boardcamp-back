import {Router} from "express";
import { getAllCustomers,getByIdCustomers,insertCustomers,updateCustomers } from "../controlles/customersController.js";
import { buscaPorCpf,validaBody } from "../middlewares/customersMiddlewares.js";

const customersRoutes = Router()

customersRoutes.get("/customers?",buscaPorCpf,getAllCustomers);
customersRoutes.get("/customers/:id",getByIdCustomers);
customersRoutes.post("/customers",validaBody,insertCustomers);
customersRoutes.put("/customers",updateCustomers);

export default customersRoutes;

