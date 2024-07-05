import { ModeloTarea } from "../database/Models/ModeloTarea.js";

export const deleteTarea = (req, res, next) => {
  const idTarea = req.params.id;

  ModeloTarea.deleteOne({ id: idTarea })
    .then((data) => {
      if (data.deletedCount !== 1) {
        throw new Error(`No existe ninguna tarea con el Id: ${idTarea}`);
      } else {
        res.json({
          message: `Tarea con Id: ${idTarea} eliminada con éxito`,
        });
      }
    })
    .catch((error) => {
      next(error);
    });
};
