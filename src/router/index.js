import Vue from "vue";
import VueRouter from "vue-router";

// installation plugin
Vue.use(VueRouter);

// lazy load view s
const Home = () => import("../views/home/Home");
const Category = () => import("views/category/Category");
const ShopCart = () => import("views/shopcart/ShopCart");
const Profile = () => import("views/profile/Profile");
const Detail =() => import("views/detail/Detail")

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/detail/:iid",
    component: Detail
  },
  {
    path: "/category",
    component: Category
  },
  {
    path: "/shopCart",
    component: ShopCart
  },
  {
    path: "/profile",
    component: Profile
  }
];

// create VueRouter
const router = new VueRouter({
  mode: "history",
  routes
});

//export
export default router;
