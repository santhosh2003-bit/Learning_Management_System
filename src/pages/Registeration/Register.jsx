import { Link } from 'react-router-dom';
const Register = () => {
  return (
  <div className="landing-container font-nunito">
      <h1>Welcome to LMS Platform</h1>
      <div className="role-buttons">
        {/* <Link to="/admin-login" className="role-button admin">
          Admin Login
        </Link> */}
        <Link to="/auth/login" className="role-button faculty">
          Login
        </Link>
        {/* <Link to="/student-login" className="role-button student">
         Student Login
        </Link> */}
      </div>
    </div>
  )
}
export default Register
