<template>
  <div class="direction-buttons">
    <button
      class="direction-buttons__button"
      :class="getClass(ascDirection)"
      @click.prevent="setDirection(ascDirection)"
    >
      По возрастанию
    </button>
    <button
      class="direction-buttons__button"
      :class="getClass(descDirection)"
      @click.prevent="setDirection(descDirection)"
    >
      По убыванию
    </button>
  </div>
</template>

<script>
import { CommentsStore } from "../../store/CommentsStore";
export default {
  name: "SortDirectionButtons",

  data() {
    return {
      ascDirection: CommentsStore.getters.directions.ASC,
      descDirection: CommentsStore.getters.directions.DESC,
    };
  },

  methods: {
    setDirection(direction) {
      CommentsStore.dispatch("changeSelectedDirection", direction);
    },

    getClass(direction) {
      if (direction === CommentsStore.getters.selectedDirection) {
        return "direction-buttons__button--active";
      }
    },
  },
};
</script>

<style scoped>
.direction-buttons {
  display: flex;
  gap: 12px;
}

.direction-buttons__button {
  padding: 12px;
  color: black;
  border: 1px solid black;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.3s;
  background-color: grey;
}

.direction-buttons__button:hover {
  opacity: 0.7;
  transition: opacity 0.3s;
}

.direction-buttons__button--active {
  background-color: green;
}
</style>
