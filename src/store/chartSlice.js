import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from '../http-common';
const initialState = {
  data: [],
  error: '',
  loading: false,
};

export const listChart = createAsyncThunk(
  '/chart/data',
  async (payload, thunkAPI) => {
    const data = await http.get('/chart/data');
    return thunkAPI.fulfillWithValue(data.data);
  }
);
export const createChart = createAsyncThunk(
  '/chart/create',
  async (payload, thunkAPI) => {
    const data = await http.post('/chart/create', payload);
    return thunkAPI.fulfillWithValue(data.data);
  }
);
export const updateChart = createAsyncThunk(
  '/chart/update',
  async (payload, thunkAPI) => {
    const data = await http.post('/chart/update', payload);
    return thunkAPI.fulfillWithValue(data.data);
  }
);
export const deleteChart = createAsyncThunk(
  '/chart/delete',
  async (payload, thunkAPI) => {
    const data = await http.post('/chart/delete', payload);
    return thunkAPI.fulfillWithValue(data.data);
  }
);

const chart = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listChart.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(createChart.fulfilled, (state, action) => {
        const newAdd = state.data;
        newAdd.push(action.payload);
        state.data = newAdd;
        state.loading = false;
      })
      .addCase(updateChart.fulfilled, (state, action) => {
        state.data = state.data.map((d) => {
          if (action.payload.id !== d.id) return d;
          return action.payload;
        });
        state.loading = false;
      })
      .addCase(deleteChart.fulfilled, (state, action) => {
        state.data = state.data.filter((d) => d.id !== action.payload.id);
        state.loading = false;
      });
  },
});

export const { setLoading } = chart.actions;
export default chart.reducer;
