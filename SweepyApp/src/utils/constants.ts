export const APP = {
  NAME: "Sweepy",
  SLOGAN: "Rápido, simple, Sweepy.",
};

export const ROUTES = {
  // Rutas Auth
  LOGIN: "/(auth)/login",
  REGISTER: "/(auth)/register",
  // Rutas Admin
  ADMINLOGIN: "/(admin)/login",
  ADMIN: "/(admin)",
  CLIENTBYID: "/(admin)/[id]",
  // Rutas Tabs
  EXPLORAR: "/(app)/(tabs)",
  MIS_ANUNCIOS: "/(app)/(tabs)/mis-anuncios",
  CREAR: "/(app)/(tabs)/crear",
  CHAT: "/(app)/(tabs)/chat",
  PERFIL: "/(app)/(tabs)/perfil",
};

export const ERRORS = {
  // --- AUTH ---
  LOGIN_ERROR: "Correo electrónico o contraseña incorrectos",
  REGISTER_ERROR: "Error al crear la cuenta. Inténtalo de nuevo.",
  // --- AUTH ~ VALIDATIONS ---
  INVALID_EMAIL: "El correo electrónico no es válido",
  USERNAME_REQUIRED: "El nombre de usuario es obligatorio",
  EMAIL_REQUIRED: "El correo electrónico es obligatorio",
  PASSWORD_SHORT: "La contraseña es demasiado corta",
  PASSWORD_MISMATCH: "Las contraseñas no coinciden",
  PASSWORD_REQUIRED: "La contraseña es obligatoria",
};

export const FILTERS = {
  ROLES: ["Usuario", "Moderador", "Administrador"],
  STATUS: ["Activo", "Inactivo", "Pendiente"],
};