

Vue.component('products', {
    data() {
        return {
            products: [],
            filtered: []
        }
    },
    methods: {
        filter(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        },


    },
    mounted() {
        this.$parent.getJson('/api/products')
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
    <div class="products item-box">
        <product ref="refref" v-for="item of filtered"
         :key="item.id_product"
         :product="item ">
         </product>
    </div>
`
})

Vue.component('product', {

    methods: {
        getProductUrl(product) {
            return `/product.html?id=${product.id_product}`
        },

        addToCart(product) {
            this.$root.$refs.headerEl.$refs.cart.addProduct(product)
        }
    },
    props: ['product'],

    template: `
    <div class="item item-index">
    <a :href="getProductUrl(product)">
              <img class="item_link item-pic" :src="product.img" alt="Some img">
               </a>
               <div class="text-box">
                 <h2 class="title">{{product.product_name}}</h2>
                    <p class="text">{{product.description}}</p>
                    <p class="price">{{product.price}}₽</p>
                            <div class="cart-box">
                                <a class="cart-link">
                                    <img src="img/cash.svg" alt="cash">
                                    <button class="add-text" @click="addToCart(product)">Add to Cart</button>
                                </a>
                            </div>
                </div>
                <div class="up-botton">
                <a :href="getProductUrl(product)" class="up-bott">
                </a>
                </div>
                
    </div>

  

    `
});