require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require ("./router/admin-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");


// let's tackle cors
const corsOptions = {
    origin:"http://localhost:5173",
    // origin: 'https://your-netlify-site.netlify.app',
    methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/form",contactRoute);
app.use("/api/data",serviceRoute);


// lets define admin route
app.use("/api/admin", adminRoute);

app.use(errorMiddleware);


const PORTS = 5000;

connectDb().then(() => {
app.listen(PORTS, () => {
    console.log(`server is running at port: ${PORTS}`);
});
});
