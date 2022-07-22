import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const server = express()
server.use(cors())
server.use(express.json())



const PORT = process.env.PORT
server.listen(PORT,()=>console.log("Servidor rodando"))
