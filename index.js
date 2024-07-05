import express from "express";
import "dotenv/config";
import cors from "cors";
import { conectarDB } from "./database/conexion.js";
import { getTareas } from "./controllers/getTareas.js";
import { getTareaById } from "./controllers/getTareaById.js";
/* import { getTareasByType } from "./controllers/getTareasByType.js"; */
import { postTarea } from "./controllers/postTarea.js";
import { putTarea } from "./controllers/putTarea.js";
import { deleteTarea } from "./controllers/deleteTarea.js";
import { controlarSesion } from "./middlewares/controlarSesion.js";
import { mostrarDatosRequest } from "./middlewares/mostrarDatosRequest.js";
import { manejadorErrores } from "./middlewares/manejadorErrores.js";
import { postUsuario } from "./controllers/postUsuario.js";
import { loginUsuario } from "./controllers/loginUsuario.js";
import { getUsuario } from "./controllers/getUsuario.js";
import { logoutUsuario } from "./controllers/logoutUsuario.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

await conectarDB();

// Middleware => Mostrar Data
app.use(mostrarDatosRequest);

app.get("/", (req, res) => {
  res.send("To-Do API");
});

// /* Usuarios */
app.post("/registrar", postUsuario);
app.post("/login", loginUsuario);
// Middleware => Controlar Sesión
app.use(controlarSesion);
app.get("/usuario", getUsuario);
app.post("/logout", logoutUsuario);

// /* Tareas */
app.get("/tareas", getTareas); /* obtener todas las tareas */
app.get("/tarea/:id", getTareaById); /* obtener tareas por id */
/*app.get("/tareas/:type", getTareasByType);  obtener tareas por tipo */
app.post("/tarea", postTarea); /* agregar nueva tarea */
app.put("/tarea/:id", putTarea); /* modificar tarea */
app.delete("/tarea/:id", deleteTarea); /* eliminar tarea */

// Middleware => Manejador de Errores
app.use(manejadorErrores);

// Servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
