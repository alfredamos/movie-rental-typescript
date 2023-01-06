"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
require("express-async-errors");
const not_found_route_middleware_1 = require("./middleware/not-found-route.middleware");
const error_handler_middleware_1 = require("./middleware/error-handler.middleware");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const genre_route_1 = __importDefault(require("./routes/genre.route"));
const movie_route_1 = __importDefault(require("./routes/movie.route"));
const rental_route_1 = __importDefault(require("./routes/rental.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
dotenv_1.default.config();
const Port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use('/api/auth', auth_route_1.default);
app.use('/api/genres', genre_route_1.default);
app.use('/api/movies', movie_route_1.default);
app.use('/api/rentals', rental_route_1.default);
app.use('/api/users', user_route_1.default);
app.use(not_found_route_middleware_1.notFoundRouteMiddleware);
app.use(error_handler_middleware_1.errorHandlerMiddleware);
app.listen(Port, () => console.log(`App is running on ${Port}...`));