import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();
const PORT = 5000;
const app = express();
app.use(express.json());
app.use(cors());
