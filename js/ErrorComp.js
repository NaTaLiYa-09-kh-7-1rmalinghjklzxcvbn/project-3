
Vue.component('form-el', {
    data() {
    },
    methods: {
        closeErr() {
            this.text = ''
        }
    },
    computed: {
        isHidden() {
            return hidden = false
        }
    },
    template: `
    <div class="error" hidden v-if="isHidden">
    <h1>ОШИБКА</h1>
    <button class = "close-error"@click="closeErr">&times</button>
    </div>
    `
})
