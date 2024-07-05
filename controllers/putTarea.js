import { ModeloTarea } from "../database/Models/ModeloTarea.js";

export const putTarea = (req, res, next) => {
  const idTarea = req.params.id;
  const { nombre, tipo, icono } = req.body;

  const datosNuevos = {};
  if (nombre) datosNuevos.nombre = nombre;
  if (tipo) datosNuevos.tipo = tipo;
  if (icono) datosNuevos.icono = icono;

  ModeloTarea.updateOne({ id: idTarea }, datosNuevos)
    .then((data) => {
      if (data.matchedCount === 0) {
        throw new Error(`No exite tarea con el Id: ${idTarea}`);
      }
      res.json({
        message: `Tarea con Id ${idTarea} modificada con éxito`,
      });
    })
    .catch((error) => {
      next(error);
    });
};
