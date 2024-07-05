import { Schema, model } from "mongoose";

const schemaTarea = new Schema({
  id: { type: Number, unique: true },
  nombre: String,
  tipo: String,
  icono: String,
  usuario: String,
});

export const ModeloTarea = model("Tarea", schemaTarea);
