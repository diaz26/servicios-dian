import express from "express";
import bodyParser from "body-parser";

import { loadApiEndpoints } from "./routes/api";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

loadApiEndpoints(app);

export default app;
