Vue.component('cart', {
    data() {
        return {
            cartItems: [],
            showCart: false,
            crUrl: '../cart.html'
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$root.putJson(`/api/cart/${find.id_product}`, { quantity: 1 });
                find.quantity++;
            } else {
                let prod = Object.assign({ quantity: 1 }, product);
                this.$root.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    });
            }
        },
        remove(item) {
            if (item.quantity > 1) {
                this.$root.putJson(`/api/cart/${item.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                        }
                    });
            } else {
                this.$root.deleteJson(`/api/cart/${item.id_product}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    });

            }
        }
    },
    computed: {
        cartTotalSum(item) {
            let result = [];
            if (this.cartItems.length) {
                for (let item of this.cartItems) {
                    result.push(item.quantity * item.price)
                }
                result = result.reduce(function (sum, el) {
                    return sum + el;
                })
                return result;
            } else {
                return 0
            }
        }
    },

    mounted() {
        this.$root.getJson('/api/cart')
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },


    template: `
        <div>
            <button class="btn-cart fa-solid fa-cart-shopping" type="button" @click="showCart = !showCart"></button>
            <div class="cart-block" v-show="showCart">
                <p v-if="!cartItems.length">Корзина пуста</p>
                <a class="cartCheckout"v-if="cartItems.length" v-bind:href="crUrl">Перейти к оформлению</a>
                <cart-item class="cart-item" 
                v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item" 
                @remove="remove">
                </cart-item>
                <div class="cartItems_total">
                <p>Сумма товаров в корзине:</p>
                <p class="cartSum">{{cartTotalSum}}</p>
              
                </div>
            </div>
        </div>`
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
                <div class="cart-item">
                <div class="product-bio">
                    <img :src="cartItem.img" alt="Some image">
                    <div class="product-desc">
                        <p class="product-title">{{cartItem.product_name}}</p>
                        <p class="product-quantity">Количество: {{cartItem.quantity}}</p>
                        <p class="product-single-price">{{cartItem.price}}₽ за единицу</p>
                    </div>
                </div>
                <div class="right-block">
                    <p class="product-price">{{cartItem.quantity*cartItem.price}}₽</p>
                    <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                </div>
            </div>
    `
});