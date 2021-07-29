import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import GroupList from "../../Models/GroupList"
import Todos from "../../Models/Todos"


interface ToDoList {
    groupListData: (GroupList)[],
    element?: Todos,
    isEdit: boolean,
}

const initialState: ToDoList = {
    groupListData: [],
    isEdit: true
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setGroupListData: (state, action: PayloadAction<(GroupList)[]>) => {
      state.groupListData = action.payload
    },
    setElement: (state, action: PayloadAction<Todos>) => {
      state.element = action.payload
    },
    setIsEdits: (state, action: PayloadAction<boolean>) => {
      state.isEdit = action.payload
    },
  }
})

export const { setGroupListData, setElement, setIsEdits} = counterSlice.actions
export default counterSlice.reducer