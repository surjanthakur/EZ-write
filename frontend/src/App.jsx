import MainAppLayout from "./layouts/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";
import { Loader } from "./components/index";
import ProtectedRoute from "./components/ProtectedRoute";
import Homepage from "./pages/HomePage";

const Login = lazy(() => import("./pages/authPages/Login.jsx"));
const Signup = lazy(() => import("./pages/authPages/signup.jsx"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage.jsx"));
const WritingPage = lazy(() => import("./pages/textEditor/WritingPage.jsx"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard.jsx"));
const PageNotFound = lazy(() => import("./pages/pageNotFound.jsx"));

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#111",
            color: "#fff",
            border: "1px solid #333",
          },
          success: {
            duration: 1000,
          },
          error: {
            duration: 1000,
          },
        }}
      />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-zinc-100">
            <Loader />
          </div>
        }
      >
        <Routes>
          <Route element={<MainAppLayout />}>
            <Route path="/" element={<Homepage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route
            path="/editor"
            element={
              <ProtectedRoute>
                <WritingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
