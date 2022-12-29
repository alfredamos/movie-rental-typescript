import dotenv from "dotenv";
import cors from "cors";
import express from "express";
require("express-async-errors");

import { notFoundRouteMiddleware } from "./middleware/not-found-route.middleware";
import { errorHandlerMiddleware } from './middleware/error-handler.middleware';

import genreRoute from "./routes/genre.route";
import movieRoute from "./routes/movie.route";
import rentalRoute from "./routes/rental.route";
import userRoute from "./routes/user.route";

const Port = process.env.PORT;
const app = express();

app.use(cors);
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api/genres', genreRoute);
app.use('/api/movies', movieRoute);
app.use('/api/rentals', rentalRoute);
app.use('/api/users', userRoute);

app.all("*", notFoundRouteMiddleware);
app.use(errorHandlerMiddleware);

app.listen(Port, () => console.log(`App is running on ${Port}...`));