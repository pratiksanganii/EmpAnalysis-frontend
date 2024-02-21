// reducers/userSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from '../http-common';

export const login = createAsyncThunk('login', async (user, thunkAPI) => {
  const data = await commonAuth('login', user);
  return thunkAPI.fulfillWithValue(data);
});

export const signup = createAsyncThunk('signup', async (user, thunkAPI) => {
  const data = await commonAuth('signup', user);
  return thunkAPI.fulfillWithValue(data);
});

export const feedDataFromExcel = createAsyncThunk(
  'upload',
  async (file, thunkAPI) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await http.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return thunkAPI.fulfillWithValue(res.data.data);
  }
);

async function commonAuth(type, user) {
  const remember = user?.remember;
  delete user?.remember;
  const res = await http.post(`/${type}`, user);
  const data = res.data.data;
  if (remember) {
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('accessToken', data.accessToken);
  }
  return data;
}

const initialState = {
  user: JSON.parse(localStorage.getItem('user') ?? '{}'),
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Define your actions here
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { setData, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
