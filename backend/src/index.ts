import app from "./app";
import { connectToDatabase } from "./db/connection.js";
import appRouter from "./routes";
import cookieParser from "cookie-parser";

const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };

// connection and listeners
const PORT = process.env.PORT || 5000;
connectToDatabase()
.then(() => {
    app.listen(PORT, () => console.log("Server Open.. Project by Sylvia Ratemo"));
    app.use(cors(corsOptions));
    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.use("/api/v1", appRouter);
})
.catch((err) => console.log(err));



