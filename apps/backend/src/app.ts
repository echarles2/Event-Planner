import express, {Express} from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";

import corsOptions from "../config/cors.js";
import setupSwagger from "../config/swagger.js";
import errorHandler from "./api/v1/middleware/errorHandler.js";

import checklistRoutes from "./api/v1/routes/checklistRoutes.js";
import createEventRoutes from "./api/v1/routes/createEventRoute.js";
import availabilityRoutes from "./api/v1/routes/availabilityRoutes.js";

// initialize express application
const app: Express = express();

// allow use of .env variables
dotenv.config();
// add morgan middleware, combined format logs info about each HTTP request
app.use(morgan("combined"));

// allow express to parse json
app.use(express.json());

// add Cross-Origin Resource Sharing middleware
// This will refuse requests from origins that do not fulfill corsOptions requirements
// see https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
app.use(cors(corsOptions));

// add clerk middleware
app.use(clerkMiddleware());

// invoke swagger middleware for serving docs in /api-docs
setupSwagger(app);

// listen for requests on root and send simple text response
app.get("/",  (_req, res) => {
    res.send("Got response from backend!");
});

// Use the checklist routes
app.use("/api/v1", checklistRoutes);
app.use("/api/v1", createEventRoutes);
app.use("/api/v1", availabilityRoutes);

//errorhandler catches errors as last element in middleware chain
// occurs when "next" is invoked
app.use(errorHandler); 

export default app;