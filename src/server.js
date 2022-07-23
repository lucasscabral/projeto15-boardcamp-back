import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js";
import chalk from "chalk"


dotenv.config()

const server = express()
server.use(cors())
server.use(express.json())
server.use(router)

const PORT = process.env.PORT
server.listen(PORT,()=>console.log(chalk.bold.yellow('Server rodando...')))
