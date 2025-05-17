import { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext/AuthContext';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { BookOpen, Clock, CheckCircle, Search, Filter, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Dummy course data for testing
const coursesData = [
  {
    _id: 'c1',
    title: 'Introduction to Python',
    description: 'Learn Python programming from scratch with hands-on examples and projects.',
    subject: 'Python',
    branch: 'CSE',
    instructor: 'Prof. Sarah Johnson',
    progress: 75,
    totalVideos: 8,
    completedVideos: 6,
    thumbnail: '/course.jpg',
    videos: [
      { _id: 'v1', title: 'Getting Started with Python', duration: '45:20', videoPath: 'intro.mp4', status: 'available', watched: true },
      { _id: 'v2', title: 'Variables & Data Types', duration: '38:15', videoPath: 'variables.mp4', status: 'available', watched: true }
    ]
  },
  {
    _id: 'c2',
    title: 'Machine Learning Basics',
    description: 'Understand core Machine Learning concepts, algorithms and practical implementations.',
    subject: 'AIML',
    branch: 'AIML',
    instructor: 'Dr. Michael Chen',
    progress: 30,
    totalVideos: 10,
    completedVideos: 3,
    thumbnail: '/course.jpg',
    videos: [
      { _id: 'v3', title: 'What is Machine Learning?', duration: '52:10', videoPath: 'ml_intro.mp4', status: 'available', watched: true },
      { _id: 'v4', title: 'Supervised Learning Algorithms', duration: '65:00', videoPath: 'supervised.mp4', status: 'upcoming', watched: false }
    ]
  },
  {
    _id: 'c3',
    title: 'Data Structures & Algorithms',
    description: 'Master fundamental data structures and algorithms used in computer science.',
    subject: 'DSA',
    branch: 'CSE',
    instructor: 'Prof. David Miller',
    progress: 0,
    totalVideos: 12,
    completedVideos: 0,
    thumbnail: '/course.jpg',
    videos: [
      { _id: 'v5', title: 'Arrays and Their Applications', duration: '41:30', videoPath: 'arrays.mp4', status: 'upcoming', watched: false },
      { _id: 'v6', title: 'Linked Lists Implementation', duration: '47:20', videoPath: 'linkedlists.mp4', status: 'upcoming', watched: false }
    ]
  },
  {
    _id: 'c4',
    title: 'Web Development Fundamentals',
    description: 'Learn HTML, CSS and JavaScript to build modern, responsive websites.',
    subject: 'Web',
    branch: 'Web',
    instructor: 'Prof. Jessica Williams',
    progress: 50,
    totalVideos: 8,
    completedVideos: 4,
    thumbnail: '/course.jpg',
    videos: [
      { _id: 'v7', title: 'HTML Structure and Elements', duration: '35:45', videoPath: 'html.mp4', status: 'available', watched: true },
      { _id: 'v8', title: 'CSS Styling Techniques', duration: '42:30', videoPath: 'css.mp4', status: 'available', watched: false }
    ]
  },
  {
    _id: 'c5',
    title: 'Advanced AI Concepts',
    description: 'Explore cutting-edge AI technologies including neural networks and deep learning.',
    subject: 'AIML',
    branch: 'AIML',
    instructor: 'Dr. Sophia Rodriguez',
    progress: 15,
    totalVideos: 10,
    completedVideos: 1.5,
    thumbnail: '/course.jpg',
    videos: [
      { _id: 'v9', title: 'Neural Networks Introduction', duration: '58:20', videoPath: 'neural.mp4', status: 'available', watched: true },
      { _id: 'v10', title: 'Building Your First AI Model', duration: '67:15', videoPath: 'model.mp4', status: 'upcoming', watched: false }
    ]
  }
];

// CourseCard component for displaying each course
const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
      <div className="relative h-40 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="/api/placeholder/400/320" alt={course.title} className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-3 left-3 right-3">
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">{course.branch}</span>
            <h3 className="mt-1 text-lg font-bold text-white truncate">{course.title}</h3>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <BookOpen size={16} className="mr-1" />
          <span>{course.totalVideos} sessions</span>
          <span className="mx-2">•</span>
          <span>{course.instructor}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">{course.description}</p>
        
        <div className="mb-3">
          <div className="flex justify-between mb-1 text-xs">
            <span className="font-medium">Progress</span>
            <span>{course.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{course.completedVideos}/{course.totalVideos} completed</span>
          <Link className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800" to={`/course/${course._id}`}>
            Continue <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Stats component for dashboard metrics
const StatsCard = ({ icon, title, value, bgColor }) => {
  return (
    <div className={`${bgColor} rounded-lg p-4 shadow-md flex items-center`}>
      <div className="mr-4 bg-white/20 p-3 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="text-white text-sm font-medium">{title}</h3>
        <p className="text-white text-xl font-bold">{value}</p>
      </div>
    </div>
  );
};

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [subject, setSubject] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Simulate API call with timeout
        setTimeout(() => {
          setCourses(coursesData);
          setLoading(false);
        }, 800);
        
        // For real API integration:
        // const response = await axios.get('/student/courses', {
        //   headers: { Authorization: token }
        // });
        // setCourses(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Filter courses based on search, branch, and tab selection
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subject ? course.subject === subject : true;
    
    if (selectedTab === 'in-progress') {
      return matchesSearch && matchesSubject && course.progress > 0 && course.progress < 100;
    } else if (selectedTab === 'not-started') {
      return matchesSearch && matchesSubject && course.progress === 0;
    } else if (selectedTab === 'completed') {
      return matchesSearch && matchesSubject && course.progress === 100;
    }
    
    return matchesSearch && matchesSubject;
  });

  // Get stats for dashboard
  const totalCourses = courses.length;
  const inProgressCourses = courses.filter(course => course.progress > 0 && course.progress < 100).length;
  const completedCourses = courses.filter(course => course.progress === 100).length;

  return (
    <div className="flex min-h-screen  font-nunito">
      <Sidebar />
      {/* Main content with proper margin to avoid sidebar overlap */}
      <div className="flex-1 p-4 md:p-6 transition-all duration-300 md:ml-64">
        <div className="mb-8 pt-12 md:pt-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Student Dashboard</h1>
              <p className="text-gray-500 mt-1">Manage your learning journey</p>
            </div>
            
            <div className="flex items-center mt-4 sm:mt-0">
              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <StatsCard 
              icon={<BookOpen size={24} className="text-white" />}
              title="Total Courses"
              value={totalCourses}
              bgColor="bg-blue-600"
            />
            <StatsCard 
              icon={<Clock size={24} className="text-white" />}
              title="In Progress"
              value={inProgressCourses}
              bgColor="bg-amber-500"
            />
            <StatsCard 
              icon={<CheckCircle size={24} className="text-white" />}
              title="Completed"
              value={completedCourses}
              bgColor="bg-green-600"
            />
          </div>

          {/* Filters and Tabs */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <div className="flex overflow-x-auto pb-2 sm:pb-0 space-x-1 bg-gray-100 p-1 rounded-lg w-full sm:w-auto">
              <button 
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${selectedTab === 'all' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}
                onClick={() => setSelectedTab('all')}
              >
                All Courses
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${selectedTab === 'in-progress' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}
                onClick={() => setSelectedTab('in-progress')}
              >
                In Progress
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${selectedTab === 'not-started' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}
                onClick={() => setSelectedTab('not-started')}
              >
                Not Started
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${selectedTab === 'completed' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}
                onClick={() => setSelectedTab('completed')}
              >
                Completed
              </button>
            </div>
            
            <div className="flex items-center w-full sm:w-auto">
              <Filter size={16} className="mr-2 text-gray-500" />
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full sm:w-auto py-2 px-3 border border-gray-300 bg-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Subjects</option>
                <option value="Python">Python</option>
                <option value="AIML">AIML</option>
                <option value="DSA">DSA</option>
                <option value="Web">Web Development</option>
              </select>
            </div>
          </div>

          {/* Course Cards Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-12 text-center">
              <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No courses found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || subject ? 'Try adjusting your filters' : 'You have no courses assigned yet'}
              </p>
              {(searchTerm || subject) && (
                <button 
                  onClick={() => {setSearchTerm(''); setSubject('');}}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredCourses.map(course => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;