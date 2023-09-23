import axios from 'axios';
import { sortComments } from '../../utils/comments.utils';

export default {
  getters: {
    selectedComment: state => state.selectedComment,
    commentsForPage: state => {
      // копирование массива комментариев
      let commentsCopy = JSON.parse(JSON.stringify(state.comments));

      commentsCopy = sortComments(commentsCopy, state.selectedSort, state.selectedDirection);

      const startIndex = (state.pageNumber - 1) * state.qtyPerPage;
      return commentsCopy?.slice(startIndex, startIndex + state.qtyPerPage);
    },

    selectedSort: state => state.selectedSort,
    selectedDirection: state => state.selectedDirection,
    pageNumber: state => state.pageNumber,

    sorts: state => state.sorts,
    directions: state => state.directions,
    qtyPerPage: state => state.qtyPerPage,

    qtyPages: state => Math.ceil(state.comments?.length / state.qtyPerPage),
    baseUrl: state => state.baseUrl,
  },

  state: {
    comments: null,
    selectedComment: null,

    selectedSort: null,
    selectedDirection: null,
    baseUrl: 'http://localhost:80',
    pageNumber: 1,

    sorts: {
      DATE: {
        code: 'date',
        label: 'По дате',
      },
      ID: {
        code: 'id',
        label: 'По id',
      },
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
    },
  },

  actions: {
    async loadComments(ctx) {
      try {
        const { data, error } = await axios.get(`${ctx.state.baseUrl}/api/comments`);

        if (error) {
          throw new Error(error);
        }

        if (data) {
          ctx.commit('SET_COMMENTS_PAYLOAD', data);
        }
      } catch (e) {
        throw new Error(e)
      }
    },

    async loadComment(ctx, id) {
      try {
        const { data, error } = await axios.get(`${ctx.state.baseUrl}/api/comments/${id}`);

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

    async createComment(ctx) {
      try {
        const { data, error } = await axios.post(`${ctx.state.baseUrl}/api/comments`, {
          ...ctx.getters.selectedComment
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
        const { data, error } = await axios.patch(`${ctx.state.baseUrl}/api/comments/${id}`, {
          body: ctx.getters.selectedComment,
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
        const { data, error } = await axios.delete(`${ctx.state.baseUrl}/api/comments/${id}`);

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
      if (sort === ctx.getters.sorts.ID.code) {
        ctx.commit('SET_SELECTED_SORT', ctx.getters.sorts.ID)
      } else {
        ctx.commit('SET_SELECTED_SORT', ctx.getters.sorts.DATE)
      }
    },

    changeSelectedDirection(ctx, direction) {
      if (direction === ctx.getters.directions.DESC) {
        ctx.commit('SET_SELECTED_DIRECTION', ctx.getters.directions.DESC)
      } else {
        ctx.commit('SET_SELECTED_DIRECTION', ctx.getters.directions.ASC)
      }
    },

    setSelectedComment(ctx, comment) {
      ctx.commit('SET_COMMENT_PAYLOAD', comment)
    },

    updateSelectedComment(ctx, comment) {
      if (!ctx.getters.selectedComment) {
        ctx.dispatch("setSelectedComment", {
          name: "",
          text: "",
          date: "",
        });
      }

      ctx.commit('UPDATE_CURRENT_COMMENT', comment);
    },

    commentValidate(ctx, comment) {
      if (!comment || !comment.name || !comment.text || !comment.date) {
        return 'Необходимо ввести данные';
      }
      return true;
    },

    gotoPage(ctx, number) {
      ctx.commit('SET_PAGE_NUMBER', number)
    }
  },
}
