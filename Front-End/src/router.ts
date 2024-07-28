import { createMemoryHistory, createRouter } from "vue-router";

import SurveyView from "./Survey.vue";
import RegisterView from "./Register.vue";
import LoginView from "./Login.vue";
import HomeView from "./root.vue";

const routes = [
    {path: "/", component: HomeView},
    {path: "/survey", component: SurveyView},
    {path: "/register", component: RegisterView},
    {path: "/login", component: LoginView},
];

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router;