import app from "./app";
import { connectToDatabase } from "./db/connection.js";
import appRouter from "./routes";
import cookieParser from "cookie-parser";

const cors = require('cors');

const corsOptions = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  };

// connection and listeners
const PORT = process.env.PORT || 5000;
connectToDatabase()
.then(() => {
    app.use(cors(corsOptions));
    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.use("/api/v1", appRouter);
    app.use((req, res, next) => {
      console.log(`Received ${req.method} request at ${req.url}`);
      next();
    });
    app.listen(PORT, () => console.log("Server Open.. Project by Sylvia Ratemo"));
})
.catch((err) => console.log(err));



