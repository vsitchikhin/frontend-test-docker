<template>
  <form class="comment-form">
    <label for="name" class="comment-form__label">
      <span class="comment-form__label-text">Имя пользователя</span>
      <input
        v-model="name"
        type="text"
        id="name"
        name="name"
        class="comment-form__input"
      />
    </label>
    <label for="text" class="comment-form__label">
      <span class="comment-form__label-text">Текст комментария</span>
      <textarea
        v-model="text"
        rows="6"
        cols="40"
        id="text"
        name="text"
        class="comment-form__text"
      />
    </label>
    <label for="date" class="comment-form__label">
      <span class="comment-form__label-text">Дата</span>
      <DatePicker
        v-model="date"
        id="date"
        valueType="format"
        format="DD/MM/YYYY"
      />
    </label>
    <button @click.prevent="sendComment">Отправить</button>
  </form>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { CommentsStore } from "../../store/CommentsStore";

export default {
  name: "CommentForm",

  components: {
    DatePicker,
  },

  data() {
    return {
      name: CommentsStore.getters.selectedComment?.name || "",
      text: CommentsStore.getters.selectedComment?.text || "",
      date: CommentsStore.getters.selectedComment?.date || "",
    };
  },

  methods: {
    async sendComment() {
      await CommentsStore.dispatch("createComment");
    },
  },

  watch: {
    name(newValue) {
      CommentsStore.dispatch("updateSelectedComment", {
        name: newValue,
      });
    },

    text(newValue) {
      CommentsStore.dispatch("updateSelectedComment", {
        text: newValue,
      });
    },

    date(newValue) {
      CommentsStore.dispatch("updateSelectedComment", {
        date: newValue,
      });
    },
  },
};
</script>

<style scoped>
.comment-form {
  border: 1px solid grey;
  border-radius: 8px;
  width: 100%;
  padding: 12px;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.comment-form__label {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 40vw;
}

.comment-form__text {
  resize: none;
  overflow-y: scroll;
}
</style>
