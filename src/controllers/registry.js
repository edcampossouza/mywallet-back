import db from "../config/database.js";
import { registryInputSchema } from "../models/registrySchema.js";
import { errorToMessage } from "./util.js";

async function addRegistry(data, type, res) {
  const { error } = registryInputSchema.validate(data, { abortEarly: false });
  if (error) {
    return res.status(422).send(errorToMessage(error));
  }
  data.type = type;
  try {
    const userExists = await db
      .collection("users")
      .findOne({ email: data.email });
    if (!userExists) return res.status(404).send("Usuário não encontrado");
    await db.collection("registries").insertOne(data );
    return res
      .status(201)
      .send(`${type === "C" ? "Entrada" : "Saída"} adicionada com sucesso`);
  } catch (error) {
    console.log("addRegistry", error);
    return res.status(500).send("Erro no servidor");
  }
}

async function getRegistries(email, type, res) {
  if (type !== "C" && type !== "D") type = null;
  try {
    const userExists = await db.collection("users").findOne({ email });
    if (!userExists || !email)
      return res.status(404).send("Usuário não encontrado");
    const filter = { email };
    if (type) filter.type = type;
    const registries = await db.collection("registries").find(filter).toArray();
    console.log(filter, registries)
    return res.status(200).send(registries);
  } catch (error) {
    console.log("addRegistry", error);
    return res.status(500).send("Erro no servidor");
  }
}

export function addIncome(req, res) {
  const data = req.body;
  addRegistry(data, "C", res);
}

export function addExpense(req, res) {
  const data = req.body;
  addRegistry(data, "D", res);
}

export function getExpenese(req, res) {
  getRegistries(req.params.email, "D", res);
}

export function getIncomes(req, res) {
  getRegistries(req.params.email, "C", res);
}

export function getAllRegistries(req, res) {
  getRegistries(req.params.email, null, res);
}