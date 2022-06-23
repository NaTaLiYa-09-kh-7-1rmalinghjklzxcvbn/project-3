Vue.component('filter-el', {
    data() {
        return {
            userSearch: ''
        }
    },
    methods: {
        reset() {
            this.userSearch = '';
            this.$root.$refs.products.filter('')
        }
    },
    template: `
            <form action="#" class="search-form" @submit.prevent="$root.$refs.products.filter(userSearch)"> 
            <input type="text" class="search-field" v-model="userSearch">
            <button v-if="userSearch.length" class="rem-form" @click="reset()">&times;</button>
            <button class="btn-search" type="submit">
            <i class="fas fa-search"></i>
        </button>
            </form>
          
    `
});
