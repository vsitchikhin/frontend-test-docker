import Vue from 'vue'

//Main pages
import App from './views/app.vue'
import { CommentsStore } from './store/CommentsStore'

const app = new Vue({
    el: '#app',
    store: CommentsStore,
    components: { App },
});
