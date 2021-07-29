import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface AddNewTodos {
  value: string,
  parentList: number,
  isEdit: boolean
}

const initialState: AddNewTodos = {
  value: "",
  parentList: 0,
  isEdit: true
}

export const counterSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
    setParentList: (state, action: PayloadAction<number>) => {
      state.parentList = action.payload
    },
    setIsEdit: (state, action: PayloadAction<boolean>) => {
      state.isEdit = action.payload
    },
  }
})

export const { setText, setParentList, setIsEdit} = counterSlice.actions
export default counterSlice.reducer