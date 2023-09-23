<template>
  <div class="main-page">
    <div class="main-page__sort">
      <SortDirectionButtons />
      <SortSelect />
    </div>
    <CommentsList />
    <PaginationList />
    <CommentForm />
  </div>
</template>

<script>
import CommentForm from "../components/CommentForm/CommentForm.vue";
import CommentsList from "../components/CommentsList/CommentsList";
import PaginationList from "../components/PaginationList/PaginationList.vue";
import SortDirectionButtons from "../components/SortDirectionButtons/SortDirectionButtons.vue";
import SortSelect from "../components/SortSelect/SortSelect.vue";
import { CommentsStore } from "../store/CommentsStore";

export default {
  name: "CommentsPage",
  components: {
    CommentsList,
    SortDirectionButtons,
    SortSelect,
    CommentForm,
    PaginationList,
  },
  data() {
    return {};
  },

  computed: {
    pageNumber: () => CommentsStore.getters.pageNumber,
    comments: () => CommentsStore.getters.comments,
  },

  watch: {
    pageNumber() {
      // Отслеживаем текущую страницу в сторе, при изменении обновляем адресную строку
      window.history.pushState(
        {},
        "",
        `${CommentsStore.getters.baseUrl}/${this.pageNumber}`
      );
    },
  },

  async created() {
    // Запрашиваем список комментариев сразу после инициализации OptionsApi
    await CommentsStore.dispatch("loadComments");

    // Тут же устанавливаем дефолтные значения сортировки и номер страницы
    CommentsStore.commit("SET_SELECTED_SORT", CommentsStore.getters.sorts.ID);
    CommentsStore.commit(
      "SET_SELECTED_DIRECTION",
      CommentsStore.getters.directions.ASC
    );

    // получаем массив подстрок адресной строки, разбитый по разделителю "/" и выбрасываем из него все, кроме чисел
    let pageNumber = window.location.href
      .split("/")
      .filter((str) => !isNaN(Number(str)) && !!str);

    // Если в массиве есть числа, забираем последнее и устанавливаем его как номер страницы
    pageNumber = pageNumber.length ? pageNumber[pageNumber.length - 1] : 1;

    // Если указана страница больше, чем может быть - записываем максимально возможную
    pageNumber =
      CommentsStore.getters.qtyPages >= pageNumber
        ? pageNumber
        : CommentsStore.getters.qtyPages;

    // Записываем в стор текущую страницу
    CommentsStore.commit("SET_PAGE_NUMBER", pageNumber);

    // Устанавливаем в адресную строку текущий номер страницы
    window.history.pushState(
      {},
      "",
      `${CommentsStore.getters.baseUrl}/${pageNumber}`
    );
  },
};
</script>

<style scoped>
.main-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}

.main-page__sort {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
}
</style>