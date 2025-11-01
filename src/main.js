import "./assets/styles/main.scss";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { setupCalendar } from "v-calendar";

const app = createApp(App);

app.use(router);

app.use(setupCalendar);

app.mount("#app");
