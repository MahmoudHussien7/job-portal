import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../../Firebase/Config";
import {
  getAuthCookie,
  removeAuthCookie,
  setAuthCookie,
} from "../../utils/Cookie";

// --- Async Thunks ---
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    { userEmail, password, userName, role = "user" },
    { rejectWithValue }
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        password
      );
      const user = userCredential.user;
      const userData = {
        userName,
        userEmail,
        userId: user.uid,
        role,
        createdAt: new Date().toISOString(),
      };
      await setDoc(doc(db, "users", user.uid), userData);

      // Save to cookie for persistence
      setAuthCookie({ uid: user.uid, ...userData });

      return { firebaseUser: user, userData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ userEmail, password }, { rejectWithValue }) => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userEmail,
        password
      );
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) throw new Error("User data not found!");
      const userData = userDoc.data();

      // Save to cookie for persistence
      setAuthCookie({ uid: user.uid, ...userData });

      return { firebaseUser: user, userData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      removeAuthCookie();
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (uid, { rejectWithValue }) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (!userDoc.exists()) throw new Error("User not found!");
      const userData = userDoc.data();

      // Update cookie with fresh data
      setAuthCookie({ uid, ...userData });

      return { firebaseUser: { uid }, userData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "auth/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const usersSnapshot = await getDocs(collection(db, "users"));
      return usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, { rejectWithValue, getState }) => {
    try {
      const { user } = getState().auth;
      if (!user) throw new Error("User not authenticated");

      await setDoc(doc(db, "users", user.uid), userData, { merge: true });

      // Update cookie with new data
      const currentCookie = getAuthCookie();
      setAuthCookie({ ...currentCookie, ...userData });

      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "users", userId));
      return userId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// --- Slice ---
const initialState = {
  user: null,
  userData: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
  users: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.firebaseUser;
      state.userData = action.payload.userData;
      state.isAuthenticated = !!action.payload.firebaseUser;
      state.isLoading = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.userData = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    setAuthLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.firebaseUser;
        state.userData = action.payload.userData;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.firebaseUser;
        state.userData = action.payload.userData;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.userData = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      })

      // Fetch user data
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload.firebaseUser;
        state.userData = action.payload.userData;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.userData = null;
      })

      // Fetch users list
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
      })

      // Update user
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userData = { ...state.userData, ...action.payload };
      })

      // Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export const { setUser, clearUser, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;
