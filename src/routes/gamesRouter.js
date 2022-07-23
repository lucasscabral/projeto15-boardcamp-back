import { Router } from "express";
import { getAllGames,getByStrings,createGame } from "../controlles/gamesController.js";

const gamesRouter = Router()

gamesRouter.get("/games",getAllGames)
gamesRouter.get("/games/?stringGame",getByStrings)
gamesRouter.post("/games",createGame)

export default gamesRouter