<template>
  <div class="pagination-list">
    <div v-for="n in qtyPages" :key="n">
      <PaginationButton :pageNumber="n" />
    </div>
  </div>
</template>

<script>
import { CommentsStore } from "../../store/CommentsStore";
import PaginationButton from "../PaginationButton/PaginationButton.vue";
export default {
  name: "PaginationList",
  components: { PaginationButton },

  computed: {
    qtyPages() {
      return CommentsStore.getters.qtyPages || 1;
    },
  },
};
</script>

<style scoped>
.pagination-list {
  display: flex;
  gap: 12px;
}
</style>
