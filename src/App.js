import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminOutlet from './components/Outlets/AdminOutlet';
import PrivateOutlet from './components/Outlets/PrivateOutlet';
import PublicOutlet from './components/Outlets/PublicRoute';
import StudentOutlet from './components/Outlets/StudentOutlet';
import Navbar from './components/UI/Navbar/Navbar';
import useAuth from './hooks/useAuth';
import useAuthCheck from './hooks/useAuthCheck';
import NotFound from './pages/NotFound';
import AdminAssignment from './pages/admin/AdminAssignment';
import AdminAssignmentMark from './pages/admin/AdminAssignmentMark';
import AdminLogin from './pages/admin/AdminLogin';
import AdminQuizzes from './pages/admin/AdminQuizzes';
import AdminVideo from './pages/admin/AdminVideo';
import Dashboard from './pages/admin/Dashboard';
import CoursePlayer from './pages/student/CoursePlayer';
import Leaderboard from './pages/student/Leaderboard';
import StudentLogin from './pages/student/StudentLogin';
import StudentQuiz from './pages/student/StudentQuiz';
import StudentRegister from './pages/student/StudentRegister';

function App() {
  const authChecked = useAuthCheck();
  const isAuthenticated = useAuth();

  return !authChecked ? (
    <div>Loading...</div>
  ) : (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/*" element={<PublicOutlet />}>
          <Route path="" element={<StudentLogin />} />
          <Route path="register" element={<StudentRegister />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/*" element={<PrivateOutlet />}>
          <Route path="/*" element={<StudentOutlet />}>
            <Route path="course-player" element={<CoursePlayer />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="quiz/:videoId" element={<StudentQuiz />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        <Route path="/admin/*">
          <Route path="" element={<PublicOutlet />}>
            <Route path="login" element={<AdminLogin />} />
          </Route>
          <Route path="" element={<PrivateOutlet />}>
            <Route path="" element={<AdminOutlet />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="videos" element={<AdminVideo />} />
              <Route path="quizzes" element={<AdminQuizzes />} />

              <Route path="assignments" element={<AdminAssignment />} />
              <Route path="assignments-mark" element={<AdminAssignmentMark />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
