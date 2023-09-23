<template>
  <form class="comment-form">
    <label for="name">
      Имя пользователя
      <input
        v-model="name"
        type="text"
        id="name"
        name="name"
        class="comment-form__input"
      />
    </label>
    <label for="message">
      Текст комментария
      <textarea
        v-model="message"
        rows="4"
        cols="20"
        id="message"
        name="message"
        class="comment-form__message"
      />
    </label>
    <label for="date">
      Дата
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
      message: CommentsStore.getters.selectedComment?.message || "",
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
      if (!CommentsStore.getters.selectedComment) {
        console.log("set new");
        CommentsStore.dispatch("setSelectedComment", {
          name: "",
          message: "",
          date: "",
        });
        console.log(CommentsStore.getters.selectedComment);
      }

      CommentsStore.dispatch("updateSelectedComment", {
        name: newValue,
      });
    },

    message(newValue) {
      if (!CommentsStore.getters.selectedComment) {
        CommentsStore.dispatch("setSelectedComment", {
          name: "",
          message: "",
          date: "",
        });
      }

      CommentsStore.dispatch("updateSelectedComment", {
        message: newValue,
      });
    },

    date(newValue) {
      if (!CommentsStore.getters.selectedComment) {
        CommentsStore.dispatch("setSelectedComment", {
          name: "",
          message: "",
          date: "",
        });
      }

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
}
</style>
