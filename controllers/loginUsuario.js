import { ModeloUsuario } from "../database/Models/ModeloUsuario.js";

export const loginUsuario = async (req, res, next) => {
  const { user, password } = req.body;
  const usuario = await ModeloUsuario.findOne({ user, password });
  
  if (usuario) {
    usuario.session = Math.random().toString(36).slice(2);
    
    usuario
      .save()
      .then(() => {
        res.json({ session: usuario.session, user: usuario });
      })
      .catch((error) => {
        next(error);
      });
  } else {
    next(new Error("Usuario o contraseña incorrecta"));
  }
};
