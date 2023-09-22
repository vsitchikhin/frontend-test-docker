<template>
  <div class="main-page">
    <CommentsList />
    <!-- * pagination -->
    <!-- * form -->
  </div>
</template>

<script>
import CommentsList from "../components/CommentsList/CommentsList";
import { CommentsStore } from "../store/CommentsStore";

export default {
  name: "CommentsPage",
  components: { CommentsList },
  data() {
    return {};
  },

  computed: {
    pageNumber: () => CommentsStore.getters.pageNumber,
    comments: () => CommentsStore.getters.comments,
  },

  watch: {
    pageNumber() {
      window.history.pushState(`/${this.pageNumber}`, "");
    },
  },

  async beforeMount() {
    CommentsStore.commit("SET_SELECTED_SORT", CommentsStore.getters.sorts.ID);
    CommentsStore.commit(
      "SET_SELECTED_DIRECTION",
      CommentsStore.getters.directions.ASC
    );
    await CommentsStore.dispatch("loadComments");
  },

  mounted() {
    window.history.pushState(
      {},
      "",
      `${CommentsStore.getters.baseUrl}/${this.pageNumber}`
    );
  },
};
</script>

<style scoped>
.main-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}
</style>