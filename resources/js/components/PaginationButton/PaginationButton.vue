<template>
  <div class="pagination-button" :class="getButtonClass" @click="changePage">
    <div class="pagination-button__button">
      {{ pageNumber }}
    </div>
  </div>
</template>

<script>
import { CommentsStore } from "../../store/CommentsStore";
export default {
  name: "PaginationButton",
  props: ["pageNumber"],

  methods: {
    changePage() {
      CommentsStore.dispatch("gotoPage", this.pageNumber);
    },

    getButtonClass() {
      if (CommentsStore.getters.pageNumber === this.pageNumber) {
        return "pagination-button--active";
      }
    },
  },
};
</script>

<style scoped>
.pagination-button {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid black;
  background-color: grey;
  color: white;
  cursor: pointer;
  transition: opacity 0.3s;
}

.pagination-button:hover {
  opacity: 0.7;
  transition: opacity 0.3s;
}

.pagination-button--active {
  background-color: green;
}

.pagination-button__button {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>