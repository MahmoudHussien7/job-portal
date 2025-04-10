import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/Firebase/Config";
import {
  setUser,
  clearUser,
  fetchUserData,
  setAuthLoading,
} from "../../app/Slices/authSlice";
import { getAuthCookie } from "../../utils/Cookie";

const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthLoading(true));

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // User is signed in
          const cookieData = getAuthCookie();

          if (cookieData && cookieData.uid === firebaseUser.uid) {
            // Use cookie data if available and matches current user
            dispatch(
              setUser({
                firebaseUser,
                userData: cookieData,
              })
            );
          } else {
            // Fetch fresh data from Firestore
            try {
              await dispatch(fetchUserData(firebaseUser.uid)).unwrap();
            } catch (error) {
              console.error("Failed to fetch user data:", error);
              dispatch(clearUser());
            }
          }
        } else {
          // User is signed out
          dispatch(clearUser());
        }
      } catch (error) {
        console.error("Auth state change error:", error);
        dispatch(clearUser());
      } finally {
        dispatch(setAuthLoading(false));
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [dispatch]);

  return null;
};

export default AuthListener;
