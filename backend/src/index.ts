import app from "./app";
import { connectToDatabase } from "./db/connection.js";

// connection and listeners
const PORT = process.env.PORT || 5000;
connectToDatabase()
.then(() => {
    app.listen(PORT, () => console.log("Server Open.. Project by Sylvia Ratemo"));
})
.catch((err) => console.log(err));

