import { ModeloTarea } from "../database/Models/ModeloTarea.js";
import { obtenerProximoId } from "../utils/functions.js";

export const postTarea = async (req, res, next) => {
  const { nombre, tipo, icono } = req.body;

  const nuevaTarea = new ModeloTarea();
  nuevaTarea.id = await obtenerProximoId(ModeloTarea);
  nuevaTarea.nombre = nombre;
  nuevaTarea.tipo = tipo;
  nuevaTarea.icono = icono;
  nuevaTarea.usuario = req.usuario.id;

  nuevaTarea
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      next(error);
    });
};
