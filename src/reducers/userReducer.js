import { createReducer } from '@reduxjs/toolkit';
import { addUser, updateUser, deleteUser } from '../actions/userActions';

const initialState = {
  users: [],
};

const userReducer = createReducer(initialState, builder => {
  builder
    .addCase(addUser, (state, action) => {
      state.users.push(action.payload);
    })
    .addCase(updateUser, (state, action) => {
      const { id, updatedUser } = action.payload;
      const index = state.users.findIndex(user => user.id === id);
      state.users[index] = { ...state.users[index], ...updatedUser };
    })
    .addCase(deleteUser, (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    });
});

export default userReducer;
