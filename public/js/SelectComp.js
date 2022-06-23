
Vue.component('selection', {
    data() {
        return {
            product: {}
        }
    },

    methods: {
        addToCart(product) {
            this.$root.$refs.headerEl.$refs.cart.addProduct(product)
        }
    },

    mounted() {
        this.$parent.getJson(`/api/products/${this.$route.query.id}`)
            .then(product => {
                this.product = product
            });

    },
    template: `
    
        <div class="cart-item">
            <div class="product-bio prod-select">
                <img :src="product.img" alt="Some image">
   
                <section class="text-prod-center">
    <div class="container">
        <h3 class="head-prod-1" v-if="product.prod_select">MEN COLECTION</h3>
        <h3 class="head-prod-1" v-else>WOMEN COLECTION</h3>
        <div class="short-line"></div>
        <h2 class="head-prod-2">{{product.product_name}}</h2>
        <p class="text-prod">{{product.description}}</p>
        <p class="prise-prod">{{product.price}}</p>
        <div class="line-prod"></div>
    
        <div class="cart-box-prod">
            <div class="cart-link cart-link-prod">
                <i class="fa-solid fa-cart-shopping fa-solid-prod"></i>
                <button class="add-text" @click="addToCart(product)">Add to Cart</button>
            </div>
        </div>
    </div>
</section>
            </div>
            </div>
            `




});

