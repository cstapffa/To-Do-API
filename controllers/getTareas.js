import { ModeloTarea } from "../database/Models/ModeloTarea.js";
import { formatearFiltrosDB } from "../utils/functions.js";

export const getTareas = (req, res, next) => {
  const filtroNombre = formatearFiltrosDB(req.query.nombre);
  const filtroTipo = formatearFiltrosDB(req.query.tipo);

  const filtros = { usuario: req.usuario.id };
  
  if (filtroNombre) filtros.nombre = filtroNombre;
  if (filtroTipo) filtros.tipo = filtroTipo;

  ModeloTarea.find(filtros)
    .then((data) => {
      console.log("get tareas => ", data);
      if (data.length === 0) {
        res.json([]);
      } else {
        res.json(data);
      }
    })
    .catch((error) => {
      next(error);
    });
};
