import { createApp } from 'vue';
import Vuex from 'vuex';

const commentsStore = new Vuex.Store({
  state() {
    return {
      comments: null,
    }
  },

  mutations: {
    loadComments() { },
    createComment() { },
    patchComment() { },
    deleteComment() { },
  }
})