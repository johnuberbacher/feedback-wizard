import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomeView from "../views/HomeView";
import EditSurvey from "../views/EditSurvey";
import Survey from "../views/Survey";
import DashboardView from "../views/DashboardView";
import LoginView from "../views/LoginView";
import CreateAccount from "../views/CreateAccount";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { title: "Home", requiresAuth: false },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { title: "Login", requiresAuth: false },
  },
  {
    path: "/create-account",
    name: "create-account",
    component: CreateAccount,
    meta: { title: "Create Account", requiresAuth: false },
  },
  {
    path: "/:id",
    component: Survey,
    meta: { title: "Survey", requiresAuth: false },
  },
  {
    path: "/edit/:id",
    component: EditSurvey,
    meta: { title: "Edit Survey", requiresAuth: true },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
    meta: { title: "Dashboard", requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  document.title = to.meta?.title + ' | Feedback Wizard' ?? "Feedback Wizard";
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
