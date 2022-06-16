import app from "./app";
import dotenv from "dotenv";

dotenv.config();

import connectDB from "../db/mongoDB" 
import { config } from "../config/config"

connectDB(config.dbConfig)

const server = app.listen(config.appConfig.port, () => { console.log(`[DIAN-services] listen on ${config.appConfig.port}`)})

export default server;
