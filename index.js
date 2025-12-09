import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import HomeDashboardView from "../views/HomeDashboardView.vue";
import AboutView from "../views/AboutView.vue";
import ContactView from "../views/ContactView.vue";
import ProductView from "../views/ProductView.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", name: "login", component: LoginView },
  {
    path: "/dashboard",
    component: DashboardView,
    children: [
      { path: "", name: "dashboard", component: HomeDashboardView },
      { path: "acerca-de", name: "about", component: AboutView },
      { path: "contacto", name: "contact", component: ContactView },
      { path: "productos", name: "productos", component: ProductView }
    ]
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});