import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import HomeDashboardView from "../views/HomeDashboardView.vue";
import AboutView from "../views/AboutView.vue";
import ContactView from "../views/ContactView.vue";
import ProductView from "../views/ProductView.vue";
import UserView from "../views/UserView.vue"; // <- Importamos la vista de usuarios (5.3 CRUD de Usuarios)


// Definición de rutas

const routes = [
  // Redirección inicial: si entran a "/", los mandamos a login
  { path: "/", redirect: "/login" },

  // Ruta de login (5.1 Autenticación de usuario)
  {
    path: "/login",
    name: "login",
    component: LoginView
  },

  // Dashboard protegido (5.2 Rutas protegidas)
  {
    path: "/dashboard",
    component: DashboardView,
    meta: { requiereAuth: true }, // <- Marca esta ruta como protegida
    children: [
      { path: "", name: "dashboard", component: HomeDashboardView }, // Página principal del dashboard
      { path: "acerca-de", name: "about", component: AboutView },
      { path: "contacto", name: "contact", component: ContactView },
      { path: "productos", name: "productos", component: ProductView }, // CRUD de Productos (5.4)
      { path: "usuarios", name: "usuarios", component: UserView } // CRUD de Usuarios (5.3)
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


//  NAVIGATION GUARD GLOBAL PROTEGER RUTAS


// Guard global que revisa si la ruta requiere autenticación
router.beforeEach((to, from, next) => {
  // Verifica si hay sesión activa (5.1 Autenticación: token simulado)
  const logueado = localStorage.getItem("logueado") === "true";

  // Si la ruta requiere autenticación y no hay sesión, redirige a login (5.2)
  if (to.meta.requiereAuth && !logueado) {
    return next("/login");
  }

  // Si ya está logueado y trata de ir a login, lo redirige al dashboard (5.2)
  if (to.name === "login" && logueado) {
    return next("/dashboard");
  }

  // Si no hay restricciones, deja pasar
  next();
});

export default router;
