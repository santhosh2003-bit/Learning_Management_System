import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext/AuthContext';

const StudentLogin = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  // Dummy student credentials for testing


  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const student = dummyStudents.find(
      s => s.rollNumber === rollNumber && s.password === password
    );

    if (student) {
      login('student-token', student.branch); // Simulate login with dummy token
      navigate('/student-dashboard');
    } else {
      setError('Invalid roll number or password');
    }

    // Uncomment this when integrating with backend
    // try {
    //   const response = await axios.post('/student/login', { rollNumber, password });
    //   login({ rollNumber, branch: response.data.branch, role: 'student' }, response.data.token);
    //   navigate('/student-dashboard');
    // } catch (err) {
    //   setError(err.response?.data?.message || 'Login failed');
    // }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Student Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default StudentLogin;