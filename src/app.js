import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import registryRouter from "./routes/registryRouter.js";

dotenv.config();
const PORT = 5000;
const app = express();
app.use(express.json());
app.use(cors());

app.use(authRouter);
app.use(registryRouter);

app.listen(PORT, console.log(`app listening on pot ${PORT}`));
