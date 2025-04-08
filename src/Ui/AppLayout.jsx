import Navbar from "../Components/Navbar";
import Loader from "./Loader";
import { Outlet, useNavigation } from "react-router-dom";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="">
      {isLoading && <Loader />}

      <Navbar />

      <div className="">
        <main className=" mx-16 mt-10 mb-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
