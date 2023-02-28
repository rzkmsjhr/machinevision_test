import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import FileUpload from "express-fileupload";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
import PostRouter from "./routes/PostRouter.js";

dotenv.config();
const app = express();

try {
    await db.authenticate();
    console.log('Database Connected...');
} catch (error) {
    console.error(error);
}

app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(router);
app.use(PostRouter);

app.listen(5000, ()=> console.log('Server running at port 5000'));