import Vue from 'vue';
import Vuex from 'vuex';
import comments from './modules/comments';

Vue.use(Vuex);

export const CommentsStore = new Vuex.Store({
  modules: {
    comments,
  }
})