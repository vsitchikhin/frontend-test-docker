<template>
  <div v-show="isShowComments" class="comment-card">
    <div class="comment-card__text-container">
      <div class="comment-card__text">Имя</div>
      <div class="comment-card__text">{{ comment?.name }}</div>
    </div>
    <div class="comment-card__text-container">
      <div class="comment-card__message">Сообщение</div>
      <div class="comment-card__message">{{ comment?.text }}</div>
    </div>
    <div class="comment-card__text-container">
      <div class="comment-card__text">Дата</div>
      <div class="comment-card__text">{{ comment?.date }}</div>
    </div>
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
  justify-content: space-between;
  width: 70vw;
  padding: 8px 20px;
  border: 1px solid red;
  border-radius: 8px;
  gap: 12px;
  align-items: center;
}

.comment-card__text-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.comment-card__message {
  width: 50vw;
  text-align: left;
}
</style>
