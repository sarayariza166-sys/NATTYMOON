import app from "./app/app.js";
import dotenv from "dotenv";
import { modelApp } from "./config/models.app.js";
import { truncates } from "bcryptjs";

dotenv.config();

modelApp(false);

const port = process.env.SERVER_PORT || 3001;

app.listen(port, () => {
    console.log(`Connected Server .... ${port}`);
});