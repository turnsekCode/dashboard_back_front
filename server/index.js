import app from "./app.js";
import { connectDB } from "./db.js";
import dotenv from 'dotenv'


dotenv.config();
const port = process.env.PORT || 4000;

connectDB();
app.listen(port);
console.log("Server on port", port);
