<template>
  <div class="comments-list">
    <div class="comments-list__cards-container">
      <CommentCard v-for="item in comments" :key="item.id" :comment="item" />
      <div class="comments-list__buttons">
        <button
          class="comments-list__button"
          @click.prevent="deleteComment(item.id)"
        >
          Удалить
        </button>
        <button
          class="comments-list__button"
          @click.prevent="patchComment(item.id)"
        >
          Редактировать
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

  data() {
    return {};
  },

  computed: {
    pageNumber: () => CommentsStore.getters.pageNumber,
    comments: () => CommentsStore.getters.commentsForPage,
  },

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
}
</style>
