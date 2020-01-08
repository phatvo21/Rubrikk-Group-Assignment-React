import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk, { ThunkMiddleware } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { postsReducer, PostsState } from './reducers/postsReducer';
import { PostsAction } from './actions/postsActions';

export interface RootState {
    readonly posts: PostsState;
}

const rootReducer = combineReducers<RootState>({
    posts: postsReducer
});

export type RootActions = PostsAction;

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(reduxThunk as ThunkMiddleware<RootState, RootActions>)
    )
);
