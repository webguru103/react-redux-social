import {
  FETCH_POSTS,
  SET_POSTS,
  UPDATE_POST_REQUEST,
} from './constants';

export function fetchPosts(accountId) {
  return { type: FETCH_POSTS, accountId };
}

export function setPosts(posts) {
  return { type: SET_POSTS, posts };
}

export function updatePostRequest(post) {
  return { type: UPDATE_POST_REQUEST, post };
}
