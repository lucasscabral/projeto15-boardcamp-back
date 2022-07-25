import { Router } from "express";
import { getRentals,insertRentals,finishRentals,deleteRentals } from "../controlles/rentalsController.js";
import { validaBody,metodosDeBuscaAlugueis,retornoDoAluguel,deletaAluguel } from "../middlewares/rentalsMiddlewares.js";


const rentalsRoutes = Router();

rentalsRoutes.get("/rentals?",metodosDeBuscaAlugueis,getRentals);
rentalsRoutes.post("/rentals",validaBody,insertRentals);
rentalsRoutes.post("/rentals/:id/return",retornoDoAluguel,finishRentals);
rentalsRoutes.delete("/rentals/:id",deletaAluguel,deleteRentals);

export default rentalsRoutes;