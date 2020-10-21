import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Register from "../views/Register.vue"
import Login from "../views/Login.vue"
import Home from "../views/Home.vue"
import InfoShow from '../views/InfoShow'
import FoundList from '../views/FoundList'
import findError from "../views/404.vue"

Vue.use(VueRouter)

const routes = [
    {
        path:"*",
        name:"/404",
        component:findError
    },
    {
        path: '/',
        redirect:"/index"
    },
    {
        path: '/index',
        name: 'index',
        component: Index,
        children:[
            {path:"",component:Home},
            {path:"/home",name:"home",component:Home},
            {path:"/infoshow",name:"infoshow",component:InfoShow},
            {path:"/foundlist",name:"foundlist",component:FoundList}
        ]
    },
    {
        path:"/register",
        name:"register",
        component:Register
    },
    {
        path:"/login",
        name:"login",
        component:Login
    }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})

export default router
