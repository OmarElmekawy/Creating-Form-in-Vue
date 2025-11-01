import Form from "../views/form.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/form",
    },
    {
      path: "/form",
      name: "form",
      component: Form,
    },
  ],
});

export default router;
