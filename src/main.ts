import { createApp } from "vue";
import Vue3Lottie from "vue3-lottie";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./index.css";

const app = createApp(App);

app.use(Vue3Lottie);
app.use(createPinia());

app.mount("#app");
