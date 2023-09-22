<template>
  <div class="comment-card">
    <div class="comment-card__name">{{ comment?.name }}</div>
    <div class="comment-card__message">{{ comment?.text }}</div>
    <div class="comment-card__date">{{ comment?.date }}</div>
  </div>
</template>

<script>
export default {
  name: "CommentCard",

  props: ["comment"],

  data() {
    return {
      isShowComments: !!this.comment,
    };
  },
};
</script>

<style scoped>
.comment-card {
  display: flex;
  width: 100%;
  padding: 8px 20px;
  border: 1px solid grey;
  border-radius: 8px;
  gap: 12px;
}
</style>
