import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import { AuthProvider } from "./Context/AuthContext/AuthContext";
import FacultyLogin from "./pages/FacultyFiles/FacultyLogin/FacultyLogin";
import FacultyDashboard from "./pages/FacultyFiles/FacultyDashboard/FacultyDashboard";
import UploadVideo from "./pages/VideoUpload/VideoUpload";
import UploadedContent from "./pages/VideoContent/VideoContent";
import AdminDashboard from "./pages/AdminFiles/AdminDashboard/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import TestPage from "./TestPage";
import ResultsPage from "./ResultsPage";
import FacultyCard from "./FacultyCard";
import Protected from "./ProtectedRoutes/Protected";
import AdminProtected from "./ProtectedRoutes/AdminProtected";
import FacultyProtected from "./ProtectedRoutes/FacultyProtected";
import Videos from "./pages/AdminFiles/Admin/Videos";
import User from "./pages/AdminFiles/Admin/User";
import AdminFaculty from "./pages/AdminFiles/Admin/AdminFaculty";
import AdminUploadContent from "./pages/AdminFiles/Admin/AdminUploadContent";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* <Route path="/admin-login" element={<AdminLogin />} /> */}
          <Route path="/auth/login" element={<FacultyLogin />} />
          {/* <Route
            path="/admin"
            element={<Protected Component={<Admin/>}/>}
          /> */}
          {/* <Route
            path="/admin/faculty-data"
            element={
              <Protected Component={ <FacultyManagement />}/>
            }
          /> */}
          <Route
            path="/admin-dashboard"
            element={<AdminProtected Component={<AdminDashboard />} />}
          />
          <Route
            path="/faculty-dashboard"
            element={<FacultyProtected Component={<FacultyDashboard />} />}
          />
          <Route
            path="/upload-video"
            element={<FacultyProtected Component={<UploadVideo />} />}
          />
          <Route
            path="/uploaded-content"
            element={<FacultyProtected Component={<FacultyCard />} />}
          />
          <Route
            path="/student-dashboard"
            element={<Protected Component={<StudentDashboard />} />}
          />
          {/* <Route path="/student-dashboard/:id" element={<OpenedVideo />} /> */}
          <Route
            path="/course/:id"
            element={<Protected Component={<UploadedContent />} />}
          />
          <Route
            path="/test/:testId"
            element={<Protected Component={<TestPage />} />}
          />
          <Route
            path="/results"
            element={<Protected Component={<ResultsPage />} />}
          />
          <Route
            path="/view/all/videos"
            element={<AdminProtected Component={<Videos />} />}
          />
          <Route
            path="/view-students"
            element={<AdminProtected Component={<User />} />}
          />
          <Route
            path="/view-faculty"
            element={<AdminProtected Component={<AdminFaculty />} />}
          />
          <Route
            path="/upload-admin"
            element={<AdminProtected Component={<AdminUploadContent />} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
