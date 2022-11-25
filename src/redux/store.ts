import { configureStore } from "@reduxjs/toolkit";
import kanbanReducer from "./slices/kanban";

export const store = configureStore({
  reducer: {
    Kanban: kanbanReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
