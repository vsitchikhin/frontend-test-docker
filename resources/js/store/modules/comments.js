import axios from 'axios';

export default {
  getters: {
    comments: state => state.comments,
    comment: state => state.comment,
    currentComment: state => state.comment,
  },
  state: {
    comments: null,
    comment: null,
    currentComment: null,
  },
  mutations: {
    SET_COMMENTS_PAYLOAD(state, payload) {
      state.comments = payload;
    },

    SET_COMMENT_PAYLOAD(state, payload) {
      state.comment = payload;
    },

    UPDATE_CURRENT_COMMENT(state, data) {
      if (!state.currentComment) {
        state.currentComment = data;
        return;
      }

      state.currentComment = {
        ...state.currentComment,
        ...data,
      }
    },
  },
  actions: {
    async loadComments(ctx) {
      try {
        const { data } = await axios.get(`${process.env.APP_URL}:80/api/comments`);
      } catch (e) {
        throw new Error(e)
      }
    },

    async loadComment(ctx, id) {
      try {
        const { data } = await axios.get(`${process.env.APP_URL}:80/api/comment/${id}`);
      } catch (e) {
        throw new Error(e)
      }
    },

    async createComment(ctx, id) {
      try {
        const { data } = await axios.post(`${process.env.APP_URL}:80/api/comment/${id}`, {
          body: ctx.state.currentComment,
        })
      } catch (e) {
        throw new Error(e)
      }
    },

    async patchComment(ctx, id) {
      try {
        const { data } = await axios.patch(`${process.env.APP_URL}:80/api/comment/${id}`, {
          body: ctx.state.currentComment,
        });
      } catch (e) {
        throw new Error(e)
      }
    },

    async deleteComment(ctx, id) {
      try {
        const { data } = await axios.delete(`${process.env.APP_URL}:80/api/comment/${id}`);
      } catch (e) {
        throw new Error(e)
      }
    },
  },
}
