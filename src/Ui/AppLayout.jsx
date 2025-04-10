import { useSelector } from "react-redux";
import { useNavigation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Loader from "./Loader";
import { Outlet, Navigate } from "react-router-dom";
function AppLayout() {
  const { isLoading } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const isNavigating = navigation.state === "loading";

  // This should never happen due to Root check, but added as safety
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      {isNavigating && <Loader />}
      <main className="mx-16 mt-10 mb-10">
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
