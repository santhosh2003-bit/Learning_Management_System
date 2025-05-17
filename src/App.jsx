import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import { AuthProvider, useAuth } from "./Context/AuthContext/AuthContext";
import AdminLogin from "./pages/AdminFiles/AdminLogin/AdminLogin";
import FacultyLogin from "./pages/FacultyFiles/FacultyLogin/FacultyLogin";
import Admin from "./pages/AdminFiles/Admin/Admin";
import FacultyDashboard from "./pages/FacultyFiles/FacultyDashboard/FacultyDashboard";
import UploadVideo from "./pages/VideoUpload/VideoUpload";
import UploadedContent from "./pages/VideoContent/VideoContent";
import AdminDashboard from "./pages/AdminFiles/AdminDashboard/AdminDashboard";
import FacultyManagement from "./pages/AdminFiles/FacultyManagement/FacultyManagement";
import StudentLogin from "./pages/StudentLogin/StudentLogin";
import StudentManagement from "./pages/AdminFiles/StudentManagement/StudentManagement";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import OpenedVideo from "./pages/OpenedVideo/OpenedVideo";

import Register from "./pages/Registeration/Register";
import TestPage from "./TestPage";
import ResultsPage from "./ResultsPage";
import FacultyCard from "./FacultyCard";

const ProtectedRoute = ({ role, children }) => {
  const { token, role: userRole } = useAuth();
  if (!token || (role && userRole !== role)) {
    return <Navigate to="/" />;
  }
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/register" element={<Register />} />
          {/* <Route path="/admin-login" element={<AdminLogin />} /> */}
          <Route path="/auth/login" element={<FacultyLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/faculty-data"
            element={
              <ProtectedRoute role="admin">
                <FacultyManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faculty-dashboard"
            element={
              <ProtectedRoute role="faculty">
                <FacultyDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload-video"
            element={
              <ProtectedRoute role="faculty">
                <UploadVideo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/uploaded-content"
            element={
              <ProtectedRoute role="faculty">
                <FacultyCard/>
              </ProtectedRoute>
            }
          />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/student-management" element={<StudentManagement />} />
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/student-dashboard/:id" element={<OpenedVideo />} />
          <Route
            path="/course/:id"
            element={
              <ProtectedRoute role="student">
                <UploadedContent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/test/:testId"
            element={
              <ProtectedRoute role="student">
                <TestPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/results"
            element={
              <ProtectedRoute role="student">
                <ResultsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
