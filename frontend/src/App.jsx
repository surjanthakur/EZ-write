import "./App.css";
import MainAppLayout from "./layouts/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Homepage,
  Signup,
  Login,
  AboutUsPage,
  WritingPageEditor,
  PageNotFound,
  Dashboard,
} from "./pages/index";
import { AuthContextProvider } from "./context/authContext";
function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainAppLayout />}>
            <Route path="/" element={<Homepage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/editor" element={<WritingPageEditor />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
