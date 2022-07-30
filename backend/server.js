import express from "express";
import cors from 'cors';
import apiRouter from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();

const filterRequestMethods =  (req, res, next) => {
    const allowedMethods = [
      "OPTIONS",
      "HEAD",
      "CONNECT",
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "PATCH",
    ];
    if (!allowedMethods.includes(req.method)) {
        res.status(405).send(`${req.method} not allowed`);
    }
    next();
};

const corsOptions = {
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        return callback(null, true);
    },

};

app.use(cors(corsOptions));
app.use(filterRequestMethods);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routers
app.use('/', apiRouter);


//port
const PORT = process.env.PORT || 8080;

//server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})