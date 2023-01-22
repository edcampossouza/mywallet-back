import { Router } from "express";
import { protectRoute } from "../middlewares/auth.js";
import {
  addExpense,
  addIncome,
  getAllRegistries,
  getExpenese,
  getIncomes,
} from "../controllers/registry.js";

const registryRouter = Router();

registryRouter.use(protectRoute);
registryRouter.post("/income", addIncome);
registryRouter.post("/expense", addExpense);
registryRouter.get("/income/", getIncomes);
registryRouter.get("/expense/", getExpenese);
registryRouter.get("/registry/", getAllRegistries);

export default registryRouter;
