<template>
  <div class="container">
    <CommentsPage />
  </div>
</template>

<script>
import CommentsPage from "../pages/index.vue";
const default_layout = "default";

export default {
  components: { CommentsPage },
};
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 40px 0;
}
</style>
