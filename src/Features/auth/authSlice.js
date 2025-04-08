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
import { createCookieSessionStorage } from "react-router-dom";

// --- ASYNC ACTIONS ---

// Register user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ userEmail, password, userName, role }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        password
      );
      const user = userCredential.user;
      const userId = user.uid;

      const userDetails = {
        userName,
        userEmail,
        userId,
        cartProducts: [],
        favoriteProducts: [],
        role: role || "user",
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "users", userId), userDetails);
      return { user, userDetails };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ userEmail, password }, { rejectWithValue }) => {
    try {
      // Set persistence to ensure the user remains logged in across sessions
      await setPersistence(auth, browserLocalPersistence);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        userEmail,
        password
      );
      const user = userCredential.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userDetails = docSnap.data();
        createCookieSessionStorage.setItem(
          "user",
          JSON.stringify({ user, userDetails })
        );

        return { user, userDetails };
      } else {
        return rejectWithValue("User document does not exist");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await signOut(auth);
});

export const fetchUsers = createAsyncThunk(
  "auth/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return usersList;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Fetch specific user data by UID
export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (uid, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userDetails = docSnap.data();
        return { userDetails };
      } else {
        return rejectWithValue("User document does not exist");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update user details
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, { rejectWithValue, getState }) => {
    try {
      const { userDetails } = getState().auth;
      if (!userDetails) throw new Error("User not authenticated");

      await setDoc(doc(db, "users", userDetails.userId), userData, {
        merge: true,
      });
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Delete user
export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const userDocRef = doc(db, "users", userId);
      await deleteDoc(userDocRef);
      return userId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// --- SLICE ---

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  userDetails: null,
  role: null,
  users: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.userDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.userDetails = action.payload.userDetails;
        state.role = action.payload.userDetails.role;
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
        state.isLoading = false;
        state.user = action.payload.user;
        state.userDetails = action.payload.userDetails;
        state.role = action.payload.userDetails.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
        state.error = null;
      })
      // Fetch user data
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDetails = action.payload.userDetails;
        state.role = action.payload.userDetails.role;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.isLoading = false;
      })
      // Fetch all users
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update user
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDetails = { ...state.userDetails, ...action.payload };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
