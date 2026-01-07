export const APP = {
  NAME: "Sweepy",
  SLOGAN: "Rápido, simple, Sweepy.",
};

export const ROUTES = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  // FORGOT_PASSWORD: "/forgot",
  ADMINLOGIN: "/admin/login",
  ADMIN: "/admin/adminPortal",
};

export const ERRORS = {
  USERNAME_REQUIRED: "El nombre de usuario es obligatorio",
  EMAIL_REQUIRED: "El correo electrónico es obligatorio",
  PASSWORD_SHORT: "La contraseña es demasiado corta",
  PASSWORD_MISMATCH: "Las contraseñas no coinciden",
  PASSWORD_REQUIRED: "La contraseña es obligatoria",
};

export const FILTERS = {
  ROLES: ["Usuario", "Moderador", "Administrador"],
  STATUS: ["Activo", "Inactivo", "Pendiente"],
}

