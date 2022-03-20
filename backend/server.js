import express from "express";
import cors from 'cors';
//import apiRouter from "./routes/index.js";

const app = express();

const corsOptions = {
    origin: 'https://localhost:8081',

};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//routers
/*app.use('/', apiRouter);

app.get('/users', (req, res) => {
    res.json({ message: 'hello from api'} )
});*/


//port
const PORT = process.env.PORT || 8080;

//server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})