import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/store/useAuth";
import { useConfigStore } from "@/store/useConfig";
import { candidate_router } from "./candidate_router";
import { recruiter_router } from "./recruiter_router";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import i18n  from "@/core/i18n/i18n";
const { t } = i18n.global
const dynamicRoutes = [
  {
    name: "test",
    path: "/test",
    component: () =>
    import(
      /* webpackChunkName: "layout" */ "@/views/Test.vue"
    ),
    meta: {
      requiresAuth: false,
    },
  },
  {
    name: "home",
    path: "/",
    redirect: "/inscription/formulaire",
    meta: {
      requiresAuth: true,
      displayToolbar: false
    },
  },
  {
    path: "/categories",
    meta: {
      requiresAuth: true,
      displayToolbar: true
    },
    component: () =>
      import(
        /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/Layout.vue"
      ),
    children: [
      {
        path: "",
        name: "list-category",
        component: () =>
          import(
            /* webpackChunkName: "list-category" */ "@/views/main/category/CategoryList.vue"
          ),
      },
      {
        path: "create",
        name: "create-category",
        component: () =>
          import(
            /* webpackChunkName: "create-category" */ "@/views/main/category/CategoryCreate.vue"
          ),
      },
      {
        path: "edit/:id",
        name: "edit-category",
        component: () =>
          import(
            /* webpackChunkName: "edit-category" */ "@/views/main/category/CategoryEdit.vue"
          ),
      },
      {
        path: ":id",
        name: "detail-category",
        component: () =>
          import(
            /* webpackChunkName: "detail-category" */ "@/views/main/category/CategoryDetail.vue"
          ),
      },
    ],
  },
];

const staticRoutes = [
  {
    path: "/inscription",
    name:"inscription",
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "layout" */ "@/views/inscription/Inscription.vue"
      ),
    children: [
      {
        path: "formulaire",
        name: "formulaire",
        component: () =>
          import(
            /* webpackChunkName: "sign_in" */ "@/views/inscription/Formulaire.vue"
          ),
      },
      {
        path: "activity",
        name: "activity",
        component: () =>
          import(
            /* webpackChunkName: "activity" */ "@/views/inscription/Activity.vue"
          ),
      },
      {
        path: "form-activity",
        name: "form-activity",
        component: () =>
          import(
            /* webpackChunkName: "activity" */ "@/views/inscription/FormInscription.vue"
          ),
      },
      {
        path: "success",
        name: "success",
        component: () =>
          import(
            /* webpackChunkName: "activity" */ "@/views/inscription/Success.vue"
          ),
      },
    ],
  },
  {
    path: "/auth",
    redirect: "/",
    component: () =>
      import(
        /* webpackChunkName: "auth_layout" */ "@/components/layouts/Auth.vue"
      ),
    children: [
      {
        path: "sign-in",
        name: "sign-in",
        meta: {
          auth: true,
        },
        component: () =>
          import(/* webpackChunkName: "sign_in" */ "@/views/auth/SignIn.vue"),
      },
      {
        path: "sign-up",
        name: "sign-up",
        meta: {
          auth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "sign_up" */
            "@/views/auth/SignUp.vue"
          ),
      },
      {
        path: "password-reset",
        name: "password-reset",
        meta: {
          auth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "password_reset" */ "@/views/auth/ResetPassword.vue"
          ),
      },
      {
        path: "email-reset-password",
        name: "email-reset-password",
        meta: {
          auth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "password_reset" */ "@/views/auth/EmailResetPassword.vue"
          ),
      },
      {
        path: "msg-reset-password",
        name: "msg-reset-password",
        meta: {
          auth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "password_reset" */ "@/views/auth/MsgResetPassword.vue"
          ),
      },
    ],
  },

  {
    // the 404 route, when none of the above matches
    path: "/404",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "error_404" */ "@/views/errors/Error404.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },

];

const routes: Array<RouteRecordRaw> = [...staticRoutes, ...dynamicRoutes , candidate_router, recruiter_router];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const store = useAuthStore();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const displayToolbar = to.matched.some((record) => record.meta.displayToolbar);
  const displayVideoToolbar = to.matched.some((record) => record.meta.displayVideoToolbar);
  const displayBreadcrumb = to.matched.some((record) => record.meta.displayBreadcrumb)
  const configStore = useConfigStore()
  let roles = [];
  to.matched.map((record) => {
    if (record.meta.roles) {
      roles = roles.concat(record.meta.roles);
    }
  });

  console.log("router debug",displayToolbar,to,store.isLoggedIn)

  if(store.isLoggedIn)
  {
    if (displayToolbar) {
      if (displayBreadcrumb){
        configStore.setBreadcrumbs({
          title: t("breadcrumb.active"),
          pageBreadcrumbPath: [t('breadcrumb.active'),t('breadcrumb.archives')],
        });
      }else{
        configStore.setBreadcrumbs({
          title: "",
          pageBreadcrumbPath: [],
        });
      }
      configStore.setLayoutConfig({
        toolbar: {
          display:true
        }
      })
    }else{
      configStore.setLayoutConfig({
        toolbar: {
          display:false
        }
      })
    }
    if (displayVideoToolbar) {
      configStore.setLayoutConfig({
        videoToolbar: {
          display:true
        }
      })
    }else{
      configStore.setLayoutConfig({
        videoToolbar: {
          display:false
        }
      })
    }


  }
 

  const authRoute = to.matched.some((record) => record.meta.auth);
  await store.getCurrent();
  const { currentUser } = useAuthStore();

  if (store.isLoggedIn && authRoute && !to.fullPath.includes("type=recovery")) {
    next({ name: "home" });
    return;
  }
  if (currentUser && currentUser.role == "recruiter_role" && to?.fullPath?.indexOf('inscription') > -1) {
    next({ name: "offers-list" });

  }
  if (requiresAuth && !store.isLoggedIn) {
    next({ name: "sign-in" });
    return;
  }
  
  
  console.log();
  next();
  return;
});

export default router;
