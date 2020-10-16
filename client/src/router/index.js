import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Register from "../views/Register.vue"
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
        component: Index
    },
    {
        path:"/register",
        name:"register",
        component:Register
    },
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

export default router
