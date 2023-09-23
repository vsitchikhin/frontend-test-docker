<template>
  <div class="comments-list">
    <div
      v-for="item in comments"
      :key="item.id"
      class="comments-list__cards-container"
    >
      <CommentCard :comment="item" />
      <div class="comments-list__buttons">
        <button
          class="comments-list__button"
          @click.prevent="deleteComment(item.id)"
        >
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CommentCard from "../CommentCard/CommentCard.vue";
import { CommentsStore } from "../../store/CommentsStore";

export default {
  name: "CommentsList",

  components: { CommentCard },

  // data() {
  //   return {
  //     comments: CommentsStore.getters.commentsForPage,
  //   };
  // },

  computed: {
    pageNumber() {
      return CommentsStore.getters.pageNumber;
    },
    comments() {
      return CommentsStore.getters.commentsForPage;
    },
    // selectedSort() {
    //   return CommentsStore.getters.selectedSort;
    // },
    // selectedDirection() {
    //   return CommentsStore.getters.selectedDirection;
    // },
  },

  // watch: {
  //   selectedSort(newValue) {
  //     this.comments = CommentsStore.getters.commentsForPage;
  //     console.log(newValue);
  //   },

  //   selectedDirection(newValue) {
  //     this.comments = CommentsStore.getters.commentsForPage;
  //     console.log(newValue);
  //   },
  // },

  methods: {
    async deleteComment(id) {
      await CommentsStore.dispatch("deleteComment", id);
    },

    patchComment(id) {
      const comment = commentsStore.comments.find((c) => c.id === id);

      commentsStore.dispatch("setSelectedComment", comment);
    },
  },
};
</script>

<style scoped>
.comments-list {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.comments-list {
  display: flex;
  width: 80vw;
  flex-direction: column;
  gap: 20px;
  border: 1px solid black;
  border-radius: 8px;
  padding: 20px;
}

.comments-list__cards-container {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.comments-list__buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.comments-list__button {
  padding: 8px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.comments-list__button:hover {
  opacity: 0.7;
  transition: opacity 0.3s;
}
</style>
