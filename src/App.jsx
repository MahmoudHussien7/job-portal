import { lazy, Suspense } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./Ui/AppLayout";
import Error from "./Ui/Error";
import { store } from "../src/app/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import Home from "./Pages/Home";
import ProtectedRoute from "./Components/Protectedroutes/ProtectedRoute";
import AuthListener from "./Features/auth/AuthListener";
import AuthWrapper from "./Components/Protectedroutes/AuthWrapper";
import Loader from "./Ui/Loader";

const JobDetailes = lazy(() => import("./Pages/JobDetailes"));
const LoginForm = lazy(() => import("./Features/auth/LoginForm"));
const Register = lazy(() => import("./Features/auth/Register"));
const Dashboard = lazy(() => import("./AdminDashboard/Dashboard"));

function App() {
  const jobs = [
    {
      id: 1,
      title: "Full Stack Developer",
      location: "California, USA",
      imgSrc: "https://cdn-icons-png.flaticon.com/512/5968/5968381.png",
      aboutjob:
        "We are looking for a Full Stack Developer to join our team and work on exciting projects.",
      requirements: [
        "Proven experience in full stack development",
        "Familiarity with front-end technologies like React",
        "Experience with back-end frameworks like Node.js",
      ],
    },
    {
      id: 2,
      title: "Frontend Developer",
      location: "New York, USA",
      imgSrc: "https://cdn-icons-png.flaticon.com/512/5968/5968381.png",
      aboutjob:
        "We are looking for a Frontend Developer to create user-friendly web applications.",
      requirements: [
        "Strong knowledge of HTML, CSS, and JavaScript",
        "Experience with React or similar frameworks",
        "Ability to work in a team environment",
      ],
    },
    {
      id: 3,
      title: "Backend Developer",
      location: "Texas, USA",
      imgSrc: "https://cdn-icons-png.flaticon.com/512/5968/5968381.png",
      aboutjob:
        "We are looking for a Backend Developer to build and maintain server-side applications.",
      requirements: [
        "Experience with server-side languages like Node.js or Python",
        "Knowledge of database management systems",
        "Ability to work with APIs and microservices",
      ],
    },
    {
      id: 4,
      title: "UI/UX Designer",
      location: "Florida, USA",
      imgSrc: "https://cdn-icons-png.flaticon.com/512/5968/5968381.png",
      aboutjob:
        "We are looking for a UI/UX Designer to create engaging user experiences.",
      requirements: [
        "Proficiency in design tools like Sketch or Figma",
        "Strong understanding of user-centered design principles",
        "Ability to collaborate with developers and stakeholders",
      ],
    },
    {
      id: 5,
      title: "Data Scientist",
      location: "Washington, USA",
      imgSrc: "https://cdn-icons-png.flaticon.com/512/5968/5968381.png",
      aboutjob:
        "We are looking for a Data Scientist to analyze and interpret complex data.",
      requirements: [
        "Experience with data analysis tools and programming languages",
        "Strong statistical knowledge",
        "Ability to communicate findings effectively",
      ],
    },
    {
      id: 6,
      title: "DevOps Engineer",
      location: "Illinois, USA",
      imgSrc: "https://cdn-icons-png.flaticon.com/512/5968/5968381.png",
      aboutjob:
        "We are looking for a DevOps Engineer to streamline our development and operations.",
      requirements: [
        "Experience with cloud services like AWS or Azure",
        "Knowledge of CI/CD pipelines",
        "Strong problem-solving skills",
      ],
    },
    {
      id: 7,
      title: "Product Manager",
      location: "Georgia, USA",
      imgSrc: "https://cdn-icons-png.flaticon.com/512/5968/5968381.png",
      aboutjob:
        "We are looking for a Product Manager to oversee product development and strategy.",
      requirements: [
        "Proven experience in product management",
        "Strong leadership skills",
        "Ability to define product vision and strategy",
      ],
    },
    {
      id: 8,
      title: "Project Manager",
      location: "Ohio, USA",
      imgSrc: "https://cdn-icons-png.flaticon.com/512/5968/5968381.png",
      aboutjob:
        "We are looking for a Project Manager to lead our team and ensure successful project delivery.",
      requirements: [
        "Proven experience in project management",
        "Excellent communication skills",
        "Ability to work under pressure",
      ],
    },
  ];

  const router = createBrowserRouter([
    {
      element: (
        <AuthWrapper>
          <AppLayout />
        </AuthWrapper>
      ),
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home jobs={jobs} />,
        },
        {
          path: "/jobs/:id",
          element: <JobDetailes jobs={jobs} />,
        },
        {
          path: "/login",
          element: <LoginForm />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/dashboard/*",
          element: <Dashboard />,
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
        <ToastContainer />
        <AuthListener />
      </Suspense>
    </Provider>
  );
}

export default App;
