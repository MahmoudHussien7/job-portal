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
      return { firebaseUser: user, userData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async ({ userEmail, password }, { rejectWithValue }) => {
//     try {
//       await setPersistence(auth, browserLocalPersistence);
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         userEmail,
//         password
//       );
//       const user = userCredential.user;
//       const userDoc = await getDoc(doc(db, "users", user.uid));

//       if (!userDoc.exists()) {
//         throw new Error("User data not found!");
//       }

//       const userData = userDoc.data();
//       return { user, userData };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
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
      return { firebaseUser: user, userData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await signOut(auth);
});

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (uid, { rejectWithValue }) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (!userDoc.exists()) throw new Error("User not found!");
      return { userData: userDoc.data() };
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
  userData: null, // تم دمج userDetails و role هنا
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
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.userData = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // معالجة الحالات العامة

      // حالات محددة
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.userData = action.payload.userData;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.userData = action.payload.userData || { role: "user" }; // قيمة افتراضية
        state.isAuthenticated = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = action.payload.userData;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userData = { ...state.userData, ...action.payload };
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
