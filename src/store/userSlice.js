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
    const fileData = new FormData();
    fileData.append('file', file);
    const res = await http.post('/upload', fileData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return thunkAPI.fulfillWithValue(res.data.data);
  }
);

async function commonAuth(type, user) {
  delete user?.remember;
  const res = await http.post(`/${type}`, user);
  const data = res.data.data;
  localStorage.setItem('accessToken', data.accessToken);
  return data;
}

const initialState = {
  user: {},
  accessToken: localStorage.getItem('accessToken'),
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
    logout: (state, action) => {
      localStorage.clear('accessToken', '');
      state.accessToken = null
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
        const accessToken = action.payload.accessToken;
        localStorage.setItem('accessToken', accessToken);
        state.user = action.payload;
        state.accessToken = accessToken;
      })
      .addCase(signup.fulfilled, (state, action) => {
        const accessToken = action.payload.accessToken;
        localStorage.setItem('accessToken', accessToken);
        state.user = action.payload;
        state.accessToken = accessToken;
      });
  },
});

export const { setData, setLoading, setError,logout } = userSlice.actions;
export default userSlice.reducer;
