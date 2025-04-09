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
        dispatch(fetchUserData(user.uid))
          .unwrap()
          .then((result) => {
            dispatch(
              setUser({ firebaseUser: user, userData: result.userData })
            );
          })
          .catch((error) => {
            console.error("Failed to fetch user data:", error);
            dispatch(clearUser());
          });
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
}

export default AuthListener;
