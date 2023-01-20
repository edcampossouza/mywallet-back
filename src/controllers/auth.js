import db from "../config/database.js";
import bcrypt from "bcrypt";
import { userInputSchema } from "../models/userSchema.js";
import { errorToMessage } from "./util.js";

export async function signUp(req, res) {
  const userInput = req.body;

  const { error } = userInputSchema.validate(userInput, { abortEarly: false });
  if (error) {
    return res.status(422).send(errorToMessage(error));
  }

  const userExists = await db
    .collection("users")
    .findOne({ email: userInput.email });

  if (userExists) {
    return res.status(409).send("Usuário já existe");
  }

  const passwordHash = bcrypt.hashSync(userInput.password, 10);

  const user = {
    email: userInput.email,
    name: userInput.name,
    passwordHash,
  };

  try {
    await db.collection("users").insertOne(user);
    return res.status(201).send("Usuário criado com sucesso");
  } catch (error) {
    return res.status(500).send("Erro no servidor");
  }
}
