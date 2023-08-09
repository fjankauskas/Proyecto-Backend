import express from "express";
import mongoose from "mongoose";
import UserModel from "./dao/models/user.model.js";
import usuariosRouter from "./routes/usuarios.js";
import * as con from "./config.js";
const app = express();

const conn = await mongoose.connect(
    `mongodb+srv://fjankauskas:fMipFUemtq5OLPLb@cluster0.a72t9bn.mongodb.net/`
);

app.use(express.json());
app.use("/api/user", usuariosRouter);

app.listen(8080, () => {
    console.log("conectados!");
});