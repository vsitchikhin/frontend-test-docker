import axios from 'axios';
import { sortComments } from '../../utils/comments.utils';

export default {
  getters: {
    selectedComment: state => state.selectedComment,
    commentsForPage: state => {
      // копирование массива комментариев
      let commentsCopy = JSON.parse(JSON.stringify(state.comments));

      commentsCopy = sortComments(commentsCopy, state.sort, state.direction);

      const startIndex = (state.pageNumber - 1) * state.qtyPerPage;
      return commentsCopy?.slice(startIndex, startIndex + state.qtyPerPage);
    },

    selectedSort: state => state.selectedSort,
    selectedDirection: state => selectedDirection,
    pageNumber: state => state.pageNumber,

    sorts: state => state.sorts,
    directions: state => state.directions,
    qtyPerPage: state => state.qtyPerPage,

    qtyPages: state => Math.ceil(state.comments?.length / state.qtyPerPage),
    baseUrl: state => state.baseUrl,
    // todo: вернуть комменты для текущей страницы
  },

  state: {
    comments: null,
    selectedComment: null,

    // selectedSort: this.sorts.ID,
    // selectedDirection: this.directions.ASC,
    baseUrl: 'http://localhost:80',
    pageNumber: 1,

    sorts: {
      DATE: 'date',
      ID: 'id',
    },
    directions: {
      ASC: 'asc',
      DESC: 'desc',
    },

    qtyPerPage: 3,
  },

  mutations: {
    SET_COMMENTS_PAYLOAD(state, payload) {
      state.comments = payload;
    },

    SET_COMMENT_PAYLOAD(state, payload) {
      state.selectedComment = payload;
    },

    UPDATE_CURRENT_COMMENT(state, data) {
      if (!state.selectedComment) {
        state.selectedComment = data;
        return;
      }

      state.selectedComment = {
        ...state.selectedComment,
        ...data,
      }
    },

    SET_SELECTED_SORT(state, sort) {
      state.selectedSort = sort;
    },

    SET_SELECTED_DIRECTION(state, direction) {
      state.selectedDirection = direction;
    },

    SET_PAGE_NUMBER(state, number) {
      state.pageNumber = number
    }
  },

  actions: {
    async loadComments(ctx) {
      try {
        const { data, error } = await axios.get(`http://localhost:80/api/comments`);

        if (error) {
          throw new Error(error);
        }

        if (data) {
          console.log(data);
          ctx.commit('SET_COMMENTS_PAYLOAD', data);
        }
      } catch (e) {
        throw new Error(e)
      }
    },

    async loadComment(ctx, id) {
      try {
        const { data, error } = await axios.get(`${this.baseUrl}/api/comment/${id}`);

        if (error) {
          throw new Error(error);
        }

        if (data) {
          ctx.commit('SET_COMMENT_PAYLOAD', data);
        }
      } catch (e) {
        throw new Error(e)
      }
    },

    async createComment(ctx, id) {
      try {
        const { data, error } = await axios.post(`${this.baseUrl}/api/comment/${id}`, {
          body: ctx.getters.currentComment,
        });

        if (error) {
          throw new Error(error);
        }

        if (data) {
          await ctx.dispatch('loadComments');
        }
      } catch (e) {
        throw new Error(e)
      }
    },

    async patchComment(ctx, id) {
      try {
        const { data, error } = await axios.patch(`${this.baseUrl}/api/comment/${id}`, {
          body: ctx.getters.currentComment,
        });

        if (error) {
          throw new Error(error);
        }

        if (data) {
          await ctx.dispatch('loadComments');
        }
      } catch (e) {
        throw new Error(e)
      }
    },

    async deleteComment(ctx, id) {
      try {
        const { data, error } = await axios.delete(`${this.baseUrl}/api/comment/${id}`);

        if (error) {
          throw new Error(error)
        }

        if (data) {
          ctx.dispatch('loadComments');
        }
      } catch (e) {
        throw new Error(e)
      }
    },

    changeSelectedSort(ctx, sort) {
      ctx.getters.selectedSort = sort;
    },

    changeSelectedDirection(ctx, direction) {
      ctx.getters.selectedDirection = direction;
    },

    setSelectedComment(ctx, comment) {
      ctx.commit('SET_COMMENT_PAYLOAD', comment)
    },
  },
}
