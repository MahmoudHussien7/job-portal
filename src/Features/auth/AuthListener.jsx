import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser, fetchUserData } from "./authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/Config";
import { getAuthCookie, setAuthCookie } from "../../utils/Cookie";

const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
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
          dispatch(fetchUserData(firebaseUser.uid))
            .unwrap()
            .then((result) => {
              const userData = result.userData;
              dispatch(setUser({ firebaseUser, userData }));
              setAuthCookie({ uid: firebaseUser.uid, ...userData });
            })
            .catch((error) => {
              console.error("Auth fetch error:", error);
              dispatch(clearUser());
            });
        }
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
};

export default AuthListener;
