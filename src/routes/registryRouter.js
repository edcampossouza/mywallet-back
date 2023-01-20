import { Router } from "express";
import {
  addExpense,
  addIncome,
  getAllRegistries,
  getExpenese,
  getIncomes,
} from "../controllers/registry.js";

const registryRouter = Router();

registryRouter.post("/income", addIncome);
registryRouter.post("/expense", addExpense);
registryRouter.get("/income/:email", getIncomes);
registryRouter.get("/expense/:email", getExpenese);
registryRouter.get("/registry/:email", getAllRegistries);

export default registryRouter;
