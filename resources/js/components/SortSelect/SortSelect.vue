<template>
  <div class="sort-select">
    <select
      name="sortSelection"
      id="sortSelection"
      class="sort-select__select"
      @change="changeSort"
    >
      <option v-for="sort in sorts" :key="sort.code" :value="sort.code">
        {{ sort.label }}
      </option>
    </select>
  </div>
</template>

<script>
import { CommentsStore } from "../../store/CommentsStore";
export default {
  name: "SortSelect",

  data() {
    return {
      sorts: CommentsStore.getters.sorts,
      selectedSort: CommentsStore.getters.selectedSort,
    };
  },

  methods: {
    changeSort(e) {
      CommentsStore.dispatch("changeSelectedSort", e.target.value);
    },
  },
};
</script>

<style scoped>
.sort-select__select {
  padding: 8px;
  cursor: pointer;
}
</style>
