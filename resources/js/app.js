import Vue from 'vue'

//Main pages
import App from './views/app.vue'
import CommentsStore from 'resources/js/store/CommentsStore'

const app = new Vue({
    el: '#app',
    store: CommentsStore,
    components: { App },
});
