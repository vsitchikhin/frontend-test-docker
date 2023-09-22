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
      return comments.sort((a, b) => a.date - b.date)
    } else {
      return comments.sort((a, b) => b.date - a.date)
    }
  } else {
    return comments;
  }
}
