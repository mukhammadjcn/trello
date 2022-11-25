import { createSlice } from "@reduxjs/toolkit";

export interface ITask {
  id: string;
  value: string;
  label: string;
  date: any;
}

export interface IColumn {
  name: string;
  id: string;
  items: ITask[];
}

const initialState = {
  columns: [
    {
      name: "To do",
      id: "123",
      items: [{ id: "1", value: "Test", label: "todo", date: "12-10-2022" }],
    },
    {
      name: "Doing",
      id: "456",
      items: [],
    },
    {
      name: "Done",
      id: "789",
      items: [],
    },
  ],
};

export const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    set: (state, action) => {
      state.columns = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { set } = kanbanSlice.actions;

export default kanbanSlice.reducer;
