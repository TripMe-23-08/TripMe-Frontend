import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "about" */ "@/views/HomeView.vue"),
  },
  {
    path: "/plan",
    name: "plan",
    component: () => import(/* webpackChunkName: "about" */ "@/views/plan/PlanView.vue"),
  },
  {
    path: "/feed",
    name: "feed",
    component: () => import(/* webpackChunkName: "about" */ "@/views/feed/FeedView.vue"),
  },
  {
    path: "/place",
    name: "place",
    component: () => import(/* webpackChunkName: "about" */ "@/views/place/SearchPlaceView.vue"),
  },
  {
    path: "/mypage",
    name: "mypageView",
    component: () => import(/* webpackChunkName: "about" */ "@/views/mypage/MyPageView.vue"),
    children: [
      {
        path: "plan",
        name: "myTripPlan",
        component: () => import("@/components/myplan/MyTripPlan.vue"),
      },
      {
        path: "post",
        name: "myPostView",
        component: () => import("@/components/myplan/MyPost.vue"),
      },
    ],
  },
  {
    path: "/edit",
    name: "mypageEdit",
    component: () => import("@/views/mypage/MyPageEditView.vue"),
  },
  {
    path: "/login",
    name: "loginView",
    component: () => import("@/views/account/LoginView.vue"),
  },
  {
    path: "/join",
    name: "joinView",
    component: () => import("@/views/account/JoinView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
