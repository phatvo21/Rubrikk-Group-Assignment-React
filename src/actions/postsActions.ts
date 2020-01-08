import posts from '../api';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { RootState, RootActions } from '../store';
import { Post, Posts } from '../reducers/postsReducer';

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;
export enum PostsActionTypes {
    FETCH_POSTS = 'FETCH_POSTS',
    FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS',
    FETCH_POSTS_FAIL = 'FETCH_POSTS_FAIL',
    FETCH_POST = 'FETCH_POST',
    FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS',
    FETCH_POST_FAIL = 'FETCH_POST_FAIL'
}

// FETCH POSTS

interface FetchPosts {
    type: PostsActionTypes.FETCH_POSTS;
}

interface FetchPostsSuccess {
    type: PostsActionTypes.FETCH_POSTS_SUCCESS;
    payload: Posts;
}

interface FetchPostsFail {
    type: PostsActionTypes.FETCH_POSTS_FAIL;
}

export const fetchPosts = (): ThunkResult<void> => async dispatch => {
    handleFetchPosts(dispatch);
    try {
        const response: any = await posts.get('/post');
        handleFetchPostsSuccess(dispatch, response.data.data);
    } catch (e) {
        handleFetchPostsFail(dispatch);
    }
};

export const handleFetchPosts = (dispatch: Dispatch<FetchPosts>) => {
    dispatch({ type: PostsActionTypes.FETCH_POSTS });
};

export const handleFetchPostsSuccess = (
    dispatch: Dispatch<FetchPostsSuccess>,
    response: Posts
) => {
    dispatch({
        type: PostsActionTypes.FETCH_POSTS_SUCCESS,
        payload: response
    });
};

export const handleFetchPostsFail = (dispatch: Dispatch<FetchPostsFail>) => {
    dispatch({
        type: PostsActionTypes.FETCH_POSTS_FAIL
    });
};

// FETCH POST

interface FetchPost {
    type: PostsActionTypes.FETCH_POST;
}

interface FetchPostSuccess {
    type: PostsActionTypes.FETCH_POST_SUCCESS;
    payload: Post;
}

interface FetchPostFail {
    type: PostsActionTypes.FETCH_POST_FAIL;
}

export const fetchPost = (id: number): ThunkResult<void> => async dispatch => {
    handleFetchPost(dispatch);
    try {
        const response: any = await posts.get(`/post/${id}`);
        handleFetchPostSuccess(dispatch, response.data.data);
    } catch (e) {
        handleFetchPostFail(dispatch);
    }
};

export const handleFetchPost = (dispatch: Dispatch<FetchPost>) => {
    dispatch({ type: PostsActionTypes.FETCH_POST });
};

const handleFetchPostSuccess = (
    dispatch: Dispatch<FetchPostSuccess>,
    response: Post
) => {
    dispatch({
        type: PostsActionTypes.FETCH_POST_SUCCESS,
        payload: response
    });
};

const handleFetchPostFail = (dispatch: Dispatch<FetchPostFail>) => {
    dispatch({
        type: PostsActionTypes.FETCH_POST_FAIL
    });
};

export type PostsAction =
    | FetchPosts
    | FetchPostsSuccess
    | FetchPostsFail
    | FetchPost
    | FetchPostSuccess
    | FetchPostFail;
