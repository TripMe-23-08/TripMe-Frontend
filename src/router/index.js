import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "about" */ "@/views/HomeView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/plan",
    name: "plan",
    component: () => import(/* webpackChunkName: "about" */ "@/views/plan/PlanView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/feed",
    name: "feed",
    component: () => import(/* webpackChunkName: "about" */ "@/views/feed/FeedView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/feed/edit",
    name: "feedEdit",
    component: () => import("@/views/feed/FeedEditView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/feed/:feedId(\\d+)",
    name: "feedDetail",
    component: () => import("@/views/feed/FeedDetailView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/feed/:feedId(\\d+)/edit",
    name: "feedDetailEdit",
    component: () => import("@/views/feed/FeedEditView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/place",
    name: "place",
    component: () => import(/* webpackChunkName: "about" */ "@/views/place/SearchPlaceView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/mypage",
    name: "mypageView",
    component: () => import(/* webpackChunkName: "about" */ "@/views/mypage/MyPageView.vue"),
    meta: { requiresAuth: true },

    // children: [
    //   {
    //     path: "plan",
    //     name: "myTripPlan",
    //     component: () => import("@/components/myplan/MyTripPlan.vue"),
    //   },
    //   {
    //     path: "post",
    //     name: "myPostView",
    //     component: () => import("@/components/myplan/MyPost.vue"),
    //   },
    // ],
  },
  {
    path: "/edit",
    name: "mypageEdit",
    component: () => import("@/views/mypage/MyPageEditView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "loginView",
    component: () => import("@/views/account/LoginView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/join",
    name: "joinView",
    component: () => import("@/views/account/JoinView.vue"),
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 모든 화면 개발 후, 주석 풀기
// router.beforeEach((to) => {
//   console.log(to.meta.requiresAuth);
//   if (to.meta.requiresAuth) {
//     let loginUser = localStorage.getItem("login_user");
//     console.log("로그인" + loginUser);
//     if (loginUser == "" || loginUser == null) {
//       return {
//         path: "/login",
//       };
//     }
//   }
// });
export default router;