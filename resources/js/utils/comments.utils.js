import { CommentsStore } from '../store/CommentsStore';

export function sortComments(comments, sort, direction) {
  if (sort === CommentsStore.getters.sorts.ID) {
    if (direction === CommentsStore.getters.directions.ASC) {
      return comments.sort((a, b) => a.id - b.id)
    } else {
      return comments.sort((a, b) => b.id - a.id)
    }
  } else if (sort === CommentsStore.getters.sorts.DATE) {
    if (direction === CommentsStore.getters.directions.ASC) {
      return comments.sort((a, b) => new Date(a.date) - new Date(b.date))
    } else {
      return comments.sort((a, b) => new Date(b.date) - new Date(a.date))
    }
  } else {
    return comments;
  }
}
