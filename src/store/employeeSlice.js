import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from '../http-common';

const initialState = {
  data: [],
  loading: true,
  error: null,
};

export const empList = createAsyncThunk('list', async (u, thunkAPI) => {
  const data = await http.get('/emp/list');
  return thunkAPI.fulfillWithValue(data.data);
});

export const create = createAsyncThunk('create', async (payload, thunkAPI) => {
  const { data } = await http.post('/emp/create', payload);
  return thunkAPI.fulfillWithValue(data?.emp);
});
export const update = createAsyncThunk('update', async (payload, thunkAPI) => {
  const { data } = await http.post('/emp/update', payload);
  return thunkAPI.fulfillWithValue(data?.emp);
});

export const deleteEmp = createAsyncThunk(
  'delete',
  async (payload, thunkAPI) => {
    const { data } = await http.post('/emp/delete', payload);
    return thunkAPI.fulfillWithValue(data.emp);
  }
);

const empSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(empList.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.data = state.data?.map((e) => {
          if (e.id !== action.payload.id) return e;
          return action.payload;
        });
      })
      .addCase(create.fulfilled, (state, action) => {
        const temp = state.data;
        temp.push(action.payload);
        state.data = temp;
      })
      .addCase(deleteEmp.fulfilled, (state, action) => {
        state.data = state.data.filter((emp) => emp.id !== action.payload.id);
      });
  },
});
export default empSlice.reducer;
