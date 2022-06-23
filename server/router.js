import Vue from "vue"
import Router from "vue-router"
import cart from "../components/cart"
import products from "../components/products"
Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: "/",
            name: "catalog",
            component: cart
        },
        {
            path: "/cart",
            name: "cart",
            component: cart

        }
    ]
})

export default router;