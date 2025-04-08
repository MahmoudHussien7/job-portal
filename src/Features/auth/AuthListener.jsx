// Features/auth/AuthListener.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser, fetchUserData } from "./authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/Config";

function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
        dispatch(fetchUserData(user.uid)); // هات بياناته من Firestore مثلاً
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
}

export default AuthListener;
