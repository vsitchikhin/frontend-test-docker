<template>
  <div class="comments-list">
    <CommentCard v-for="item in comments" :key="item.id" :comment="item" />
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
};
</script>

<style scoped>
.comments-list {
  display: flex;
  width: 100%;
  justify-content: center;
}

.comments-list__cards-container {
  display: flex;
  width: 80%;
  flex-direction: column;
  gap: 20px;
  border: 1px solid black;
  border-radius: 8px;
  padding: 20px;
}
</style>
