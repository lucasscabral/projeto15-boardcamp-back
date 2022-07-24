import { Router } from "express";
import { getByCharacters,createGame } from "../controlles/gamesController.js";
import { verificaCaracteres,validaCriacaoGame } from "../middlewares/gamesMiddlewares.js";

const gamesRouter = Router();

gamesRouter.get("/games?",verificaCaracteres,getByCharacters);
gamesRouter.post("/games",validaCriacaoGame,createGame);

export default gamesRouter;