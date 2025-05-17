import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../Context/AuthContext/AuthContext';
import VideoCard from '../../../Components/VideoCard/VideoCard';
import Sidebar from '../../../Components/Sidebar/Sidebar';

// Dummy data for testing
const dummyVideos = [
  {
    _id: '1',
    title: 'Introduction to Algorithms',
    description: 'A beginner-friendly introduction to algorithms.',
    branch: 'CSE',
    thumbnail: '/course.jpg',
    videoPath: 'Random.mp4',
    uploadedBy: { name: 'Faculty A' },
    status: 'pending',
  },
  {
    _id: '2',
    title: 'Machine Learning Basics',
    description: 'An overview of machine learning concepts.',
    branch: 'AIML',
    thumbnail: '/course.jpg',
    videoPath: 'Random.mp4',
    uploadedBy: { name: 'Faculty B' },
    status: 'approved',
  },
  {
    _id: '3',
    title: 'Data Structures Overview',
    description: 'Understanding data structures in depth.',
    branch: 'CSE',
    thumbnail: '/course.jpg',
    videoPath: 'Random.mp4',
    uploadedBy: { name: 'Faculty C' },
    status: 'rejected',
  },
];

const AdminDashboard = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Simulate API call with dummy data for testing
        // Comment out the axios call and use dummy data
        // const response = await axios.get('/admin/manage-content', {
        //   headers: { Authorization: token }
        // });
        // setVideos(response.data);
        // Use dummy data instead
        setTimeout(() => {
          setVideos(dummyVideos);
          setLoading(false);
        }, 1000); // Simulate network delay
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch content');
        setLoading(false);
      }
    };
    fetchContent();
  }, [token]);

  const handleStatusChange = async (videoId, status) => {
    try {
      // Simulate API call with dummy data for testing
      // Comment out the axios call and update state directly
      // await axios.put(`/admin/manage-content/${videoId}`, { status }, {
      //   headers: { Authorization: token }
      // });

      // Update state directly with dummy data
      setVideos(videos.map(video => video._id === videoId ? { ...video, status } : video));
      alert(`Video ${status} successfully`);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  return (
    <>
    <Sidebar/>
      <div className="content">
        <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
        <h2 className='text-2xl font-bold text-gray-300'>Manage Content</h2>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && videos.length === 0 && (
          <p style={{ color: '#555' }}>
            No content available. This might be because no faculty has uploaded content yet.
          </p>
        )}
        <div className='flex flex-wrap gap-x-10 md:flex-row flex-col'>

        {!loading && !error && videos.length > 0 && (
          videos.map(video => (
            <VideoCard
              key={video._id}
              video={video}
              role="admin"
              onApprove={() => handleStatusChange(video._id, 'approved')}
              onReject={() => handleStatusChange(video._id, 'rejected')}
            />
          ))
        )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;