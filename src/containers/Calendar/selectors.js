/* eslint-disable import/prefer-default-export */

import { createSelector } from 'reselect';

const selectCalendar = (state) => state.get('calendar');

const makeSelectPosts = () => createSelector(
    selectCalendar,
    (posts) => posts.get('posts'),
);

export {
    makeSelectPosts,
};
