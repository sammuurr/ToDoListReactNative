import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import AddNewTodos from './features/AddNewTodos';
import ToDoList from './features/ToDoList';

export const store = configureStore({
  reducer: {
    addNewTodos: AddNewTodos,
    toDoList: ToDoList,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
