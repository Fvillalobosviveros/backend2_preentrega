exports.authorizeRole = (role) => {
    return (req, res, next) => {
      const user = req.user; // Usuario autenticado a través de "verifyToken"
  
      if (!user) {
        return res.status(401).json({ message: "No autenticado" });
      }
  
      if (user.role !== role) {
        return res.status(403).json({ message: `Acceso denegado. Se requiere rol: ${role}` });
      }
  
      next();
    };
  };
  