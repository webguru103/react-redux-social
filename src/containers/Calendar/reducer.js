import { fromJS } from 'immutable';

import {
  UPDATE_POST_SUCCESS,
} from 'containers/App/constants';

import {
  FETCH_POSTS,
  SET_POSTS,
} from './constants';

const initialState = fromJS({
  posts: [],
});

function postsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return state.set('posts', []);
    case SET_POSTS:
      return state.set('posts', action.posts);
    case UPDATE_POST_SUCCESS: {
      const index = state.get('posts').findIndex((post) => post.post.post_id === action.post.post_id);
      return state.update('posts', (posts) => {
        const reducedPosts = [...posts];
        reducedPosts[index].post = action.post;
        return reducedPosts;
      });
    }
    default: return state;
  }
}

export default postsReducer;
